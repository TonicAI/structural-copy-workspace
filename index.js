const core = require('@actions/core');
const https = require('https');

async function makeRequest(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({
            statusCode: res.statusCode,
            body: body ? JSON.parse(body) : null
          });
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            body: body
          });
        }
      });
    });
    
    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function run() {
  try {
    const apiHost = core.getInput('structural-url');
    const apiKey = core.getInput('structural-api-key');
    const parentWorkspace = core.getInput('workspace-to-copy-id');
    const workspaceName = core.getInput('workspace-name');
    core.info(`API Host: ${apiHost}`);
    core.info(`Parent Workspace: ${parentWorkspace}`);
    core.info(`Workspace Name: ${workspaceName}`);

    const url = new URL(`/api/workspace/${parentWorkspace}/copy`, apiHost);
    
    const payload = {
      copyName: workspaceName,
    };
    
    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `apikey ${apiKey}`
      }
    };
    
    core.info(`Cloning workspace ${parentWorkspace} to ${workspaceName}`);
    
    const response = await makeRequest(options, payload);
    
    if (response.statusCode >= 400) {
      throw new Error(`HTTP ${response.statusCode}: ${JSON.stringify(response.body)}`);
    }
    core.info(`Cloning workspace request status code ${response.statusCode}`);
    
    const workspace = response.body;
    
    core.setOutput('id', workspace.id);
    core.setOutput('link', `${apiHost}/workspaces/${workspace.id}`);

    core.info(`Workspace cloned successfully: ${workspace.id}`);
    
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();