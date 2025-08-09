package main

import(
	"github.com/julienschmidt/httprouter"
	"gopkg.in/mgo.v2"
	"net/http"
	"go-mongo/controllers"
)

func main() {
	r := httprouter.New()
	uc := controllers.NewUserController(getSession())
	r.GET("/user/:id", uc.GetUser)
	r.POST("/user", uc.CreateUser)
	r.DELETE("/user/:id", uc.DeleteUser)
	http.ListenAndServe(":9000", r)
}

func getSession() *mgo.Session{
	s, err := mgo.Dial("mongodb://localhost:27107")
	if err != nil{
		panic(err)
	}
	return s
}