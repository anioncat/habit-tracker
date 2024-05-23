package api

import (
	"database/sql"
	"errors"

	_ "github.com/mattn/go-sqlite3"
)

type SqliteRepository struct {
	db *sql.DB
}

var ErrNotImplemented error = errors.New("not implemented")

func CreateSqliteRep(fn string) (*SqliteRepository, error) {
	db, err := sql.Open("sqlite3", fn)
	if err != nil {
		return nil, err
	}
	return &SqliteRepository{
		db: db,
	}, nil
}

func (rep *SqliteRepository) Migrate() error {
	query := `
	CREATE TABLE IF NOT EXISTS entrydata(
		year INTEGER PRIMARY KEY
		month INTEGER PRIMARY KEY
		date INTEGER PRIMARY KEY
		data STRING
	);
	`
	_, err := rep.db.Exec(query)
	return err
}
func (rep *SqliteRepository) Create(data Data) (*Data, error) {
	return nil, ErrNotImplemented
}
func (rep *SqliteRepository) All() (*Data, error) {
	return nil, ErrNotImplemented
}
func (rep *SqliteRepository) Update(updated Data) (*Data, error) {
	return nil, ErrNotImplemented
}
func (rep *SqliteRepository) Delete() error {
	return ErrNotImplemented
}

// Assert interface implementation
var (
	_ JournalRepository = &SqliteRepository{}
	_ JournalRepository = (*SqliteRepository)(nil)
)
