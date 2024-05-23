package api

type JournalRepository interface {
	Migrate() error
	Create(data Data) (*Data, error)
	All() (*Data, error)
	Update(updated Data) (*Data, error)
	Delete() error
}
