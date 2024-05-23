package api

import (
	"encoding/json"
	"os"
)

type PlainTextFileRepository struct {
	fn string
}

func CreatePTRep(fn string) *PlainTextFileRepository {
	return &PlainTextFileRepository{
		fn: fn,
	}
}

func (r *PlainTextFileRepository) Migrate() error {
	_, err := os.Stat(r.fn)
	if os.IsNotExist(err) {
		_, err := os.Create(r.fn)
		if err != nil {
			return err
		}
	}
	return nil
}

func (r *PlainTextFileRepository) Create(data Data) (*Data, error) {
	fp, err := os.Open(r.fn)
	if err != nil {
		fp.Close()
		return nil, err
	}
	defer fp.Close()

	e := json.NewEncoder(fp)
	if err := e.Encode(data); err != nil {
		return nil, err
	}
	return &data, nil
}

func (r *PlainTextFileRepository) All() (*Data, error) {
	fp, err := os.Open(r.fn)
	if err != nil {
		fp.Close()
		return nil, err
	}
	defer fp.Close()

	var data Data
	d := json.NewDecoder(fp)
	if err := d.Decode(&data); err != nil {
		return nil, err
	}
	return &data, nil
}

func (r *PlainTextFileRepository) Update(updated Data) (*Data, error) {
	fp, err := os.Create(r.fn)
	if err != nil {
		return nil, err
	}
	defer fp.Close()

	e := json.NewEncoder(fp)
	if err := e.Encode(updated); err != nil {
		return nil, err
	}
	return &updated, nil
}

func (r *PlainTextFileRepository) Delete() error { return nil }

// Assert interface implementation
var (
	_ JournalRepository = &PlainTextFileRepository{}
	_ JournalRepository = (*PlainTextFileRepository)(nil)
)
