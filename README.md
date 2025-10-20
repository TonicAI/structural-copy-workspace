# Copy Workspace

This action copies a Structural workspace and returns the new workspace ID and link.

## Inputs

- `structural-url` (optional): Structural API base URL, defaults to 'https://app.tonic.ai'
- `structural-api-key` (required): Structural API key for authentication
- `workspace-to-copy-id` (required): The workspace ID (GUID) to copy
- `workspace-name` (required): Name for the copied workspace

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

## License

MIT