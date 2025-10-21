# Copy workspace

This action copies a Structural workspace. It returns the identifier of and link to the new workspace.

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `structural-url` | Base URL for the Structural API | No | `https://app.tonic.ai` |
| `structural-api-key` | Structural API key for authentication | Yes | |
| `workspace-to-copy-id` | The identifier (GUID) of the workspace to copy | Yes | |
| `workspace-name` | The name to give to the copied workspace | Yes | |

## Outputs

- `id`: The identifier of the copied workspace
- `link`: A link to the copied workspace

## Example usage

```yaml
jobs:
  copy-workspace:
    runs-on: ubuntu-latest
    steps:
      - name: Copy workspace
        id: copy-workspace
        uses: TonicAI/structural-copy-workspace@v1
        with:
          structural-api-key: ${{ secrets.STRUCTURAL_API_KEY }}
          workspace-to-copy-id: ${{ secrets.STRUCTURAL_WORKSPACE_ID }}
          workspace-name: 'My copied workspace'

      - name: Print workspace information
        run: |
          echo "Copied workspace ID: ${{ steps.copy-workspace.outputs.id }}"
          echo "Workspace link: ${{ steps.copy-workspace.outputs.link }}"
```

## Develop

### Setup
```bash
npm install
```

### Build
```bash
npm run package
```

This uses `@vercel/ncc` to compile the action into a single file in the `dist` folder.

## Publish

Before you publish, make sure to:
1. Build the action: `npm run package`
2. Commit the `dist` folder to the repository
3. Tag your release: `git tag -a v1 -m "Release v1"`
4. Push the tag: `git push origin v1`
