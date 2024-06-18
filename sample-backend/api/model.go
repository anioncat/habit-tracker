package api

import (
	"time"
)

type Data struct {
	Meta     MetaData     `json:"meta"     binding:"required"`
	Journals []JournalDay `json:"journals" binding:"required"`
}

type MetaData struct {
	DateCreated   time.Time `json:"dateCreated,omitempty"`
	DateEdited    time.Time `json:"dateEdited,omitempty"`
	SchemaVersion string    `json:"schemaVersion,omitempty"`
	AppVersion    string    `json:"appVersion,omitempty"`
}

type EntryData struct {
	Id      int         `json:"id"`
	Name    string      `json:"name"`
	Data    interface{} `json:"data"`
	Comment string      `json:"comment"`
	IsScale bool        `json:"isScale"`
}

type Entry struct {
	Meta MetaData  `json:"meta"`
	Data EntryData `json:"data"`
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
