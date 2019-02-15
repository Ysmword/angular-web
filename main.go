package main


import(
	// "fmt"
	// "pgdrive"
	"dealfront"
	"net/http"
)


func main(){

	//先测试,能连接postgres，并且能链接数据库
	// dbname := "login" 
	// db := pgdrive.GetDB(dbname)
	// fmt.Println(db)

	//查询用户是否存在，或者用户的信息是否正确
	//这里需要从前端拿到信息
	// //先虚构一个数据
	// Account :="12345678912"
	// password :="ysm@121388"
	// pgdrive.Querydata(db,Account,password)   //查找数据，能实现后端数据的判断的



	//登录处理函数，用户链接，自动调用制定的处理函数
	go http.HandleFunc("/login",dealfront.Deallogin)
	//注册处理函数
	go http.HandleFunc("/register",dealfront.Dealregister)
	//显示数据
	go http.HandleFunc("/cartoon",dealfront.Dealdisplay)
	//删除数据
	go http.HandleFunc("/delete",dealfront.Displaydelete)
	//修改信息
	go http.HandleFunc("/changedata",dealfront.Dealchangedata)
	//添加动漫信息
	go http.HandleFunc("/addct",dealfront.Dealadd)
	//找回密码
	go http.HandleFunc("/findpassword",dealfront.Dealpassword)


    //绑定监听
    http.ListenAndServe(":8000", nil)
	//这样就相当于创建一个服务端了

}

