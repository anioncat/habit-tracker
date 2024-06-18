package main

import (
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"habit-back/api"
)

func main() {
	r := gin.Default()
	r.Use(cors.Default())
	r.GET("/ping", Ping("Server"))
	v1 := r.Group("/v1")
	{
		var rep api.JournalRepository = api.CreatePTRep("data.json")
		if err := rep.Migrate(); err != nil {
			log.Println(err)
		}
		v1.GET("/ping", Ping("v1"))
		v1.GET("/journal", GetJournal(&rep))
		v1.POST("/journal", PostJournal(&rep))
	}

	v2 := r.Group("/v2")
	{
		var rep api.JournalRepository
		rep, err := api.CreateSqliteRep("sqlite.db")
		if err != nil {
			log.Fatal(err.Error())
		}
		if err := rep.Migrate(); err != nil {
			log.Println(err)
		}
		v2.GET("/ping", Ping("v2"))
		v2.GET("/journal", GetJournal(&rep))
		v2.POST("/journal", PostJournal(&rep))
	}
	r.Run(":1235")
}

func Ping(where string) func(*gin.Context) {
	return func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok", "where": where})
	}
}

func GetJournal(rep *api.JournalRepository) func(c *gin.Context) {
	return func(c *gin.Context) {
		d, err := (*rep).All()
		if err != nil {
			c.Status(http.StatusNoContent)
		} else {
			c.JSON(http.StatusOK, d)
		}
	}
}

func PostJournal(rep *api.JournalRepository) func(c *gin.Context) {
	return func(c *gin.Context) {
		var data api.Data
		if err := c.ShouldBindJSON(&data); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"status": "error", "error": err.Error(), "got": c.Request.Body})
			return
		}
		if res, err := (*rep).Update(data); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		} else {
			c.JSON(http.StatusOK, res)
		}
	}
}
