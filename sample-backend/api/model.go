package api

type Data struct {
	Meta     MetaData      `json:"meta"     binding:"required"`
	Journals []JournalYear `json:"journals" binding:"required"`
}

type MetaData struct {
	DateCreated   uint64 `json:"dateCreated,omitempty"`
	DateEdited    uint64 `json:"dateEdited,omitempty"`
	SchemaVersion string `json:"schemaVersion,omitempty"`
	AppVersion    string `json:"appVersion,omitempty"`
}

type EntryData struct {
	Id      int         `json:"id"      binding:"required"`
	Name    string      `json:"name"    binding:"required"`
	Data    interface{} `json:"data"    binding:"required"`
	Comment string      `json:"comment" binding:"required"`
	IsScale bool        `json:"isScale" binding:"required"`
}

type Entry struct {
	Meta MetaData  `json:"meta"`
	Data EntryData `json:"data" binding:"required"`
}

type JournalDay struct {
	Month   int      `json:"month"   binding:"required"`
	Date    int      `json:"date"    binding:"required"`
	Entries []Entry  `json:"entries" binding:"required"`
	Meta    MetaData `json:"meta"    binding:"required"`
}

type JournalYear struct {
	Year    int          `json:"year"    binding:"required"`
	Entries []JournalDay `json:"entries" binding:"required"`
	Meta    MetaData     `json:"meta"    binding:"required"`
}
