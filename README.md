# Copy Workspace

This action copies a Structural workspace and returns the new workspace ID and link.

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `structural-url` | Structural API base URL | No | `https://app.tonic.ai` |
| `structural-api-key` | Structural API key for authentication | Yes | |
| `workspace-to-copy-id` | The workspace ID (GUID) to copy | Yes | |
| `workspace-name` | Name for the copied workspace | Yes | |

## Outputs

- `id`: The ID of the copied workspace
- `link`: Link to the copied workspace

## Example Usage

```yaml
jobs:
  copy-workspace:
    runs-on: ubuntu-latest
    steps:
      - name: Copy Workspace
        id: copy-workspace
        uses: TonicAI/structural-copy-workspace@v1
        with:
          structural-api-key: ${{ secrets.STRUCTURAL_API_KEY }}
          workspace-to-copy-id: ${{ secrets.STRUCTURAL_WORKSPACE_ID }}
          workspace-name: 'My Copied Workspace'

      - name: Print Workspace Info
        run: |
          echo "Copied workspace ID: ${{ steps.copy-workspace.outputs.id }}"
          echo "Workspace link: ${{ steps.copy-workspace.outputs.link }}"
```

## Development

### Setup
```bash
npm install
```

### Build
```bash
npm run package
```

This will compile the action into a single file in the `dist` folder using `@vercel/ncc`.

## Publishing

Before publishing, make sure to:
1. Build the action: `npm run package`
2. Commit the `dist` folder to the repository
3. Tag your release: `git tag -a v1 -m "Release v1"`
4. Push the tag: `git push origin v1`