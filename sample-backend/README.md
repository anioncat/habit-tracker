# Sample backend

The backend is separated because tracking life statuses should be kept private. The frontend should be sufficient for normal use with the backup only for those wanting their data backed up.

## Usage

- `make`: alias for `make build`
- `make build`: builds the Go program into dist
- `make clean`: removes the built and any zipped files
- `make zip`: zips the built program into a tar zip ball

