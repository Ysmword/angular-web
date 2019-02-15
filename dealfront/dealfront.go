package dealfront

import(
	"net/http"
	"fmt"
	"io/ioutil"  
	"encoding/json"
	"pgdrive"
)

func Cross(w http.ResponseWriter) http.ResponseWriter{
	w.Header().Set("Access-Control-Allow-Origin", "*") //允许访问所有域
	w.Header().Add("Access-Control-Allow-Headers", "Content-Type") //header的类型
	w.Header().Set("content-type", "application/json") //返回数据格式是json
	return w
}

type Response struct{
	Data string `json:"data"`
}

//测试数据
type Inforation struct{
	Data string `json:"data"`
	Name string `json:"name"`
}

type Information struct{
	ID string
	name string
	author string
	Type  string
	episodes string
	comment string
}

// type User struct {
// 	id string
// 	password string
// }  这是暂时的
type User struct{
	name string
	Account string
	password string
	phonenumber string 
}




func Deallogin(w http.ResponseWriter, r *http.Request){
	//这是用来处理前端的登录的函数、

	//http.Request 读取客户端发送来的信息，因此我在这里接收数据

	//要在这里实现，post数据的接收和处理，并返回数据

	//先测试,能连接postgres，并且能链接数据库
	dbname := "login" 
	db := pgdrive.GetDB(dbname)
	fmt.Println(db)

	var Info string     //这个用来承接信息的

	w=Cross(w)    //这个表示跨域的处理
	var user map[string]interface{}
	// var user User
	body,err:=ioutil.ReadAll(r.Body)
	if err!=nil{
		// log.Fatal(err)     //关闭当前文件系统
		fmt.Println(err)
		//发送的数据为，当前的服务器，出现错误，请刷新页面，重新连接
		var info string="连接出现错误，请刷新页面"
		response := Inforation{info,info}
		json, err := json.Marshal(response)
		//Marshal表示转化为json字符串
		if err != nil {

			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Write(json)
		return 
	}
	json.Unmarshal(body,&user)  //这里接收到的数据，承载体是user
	//不用遍历了，这样就可以访问了

	if user!=nil{
		fmt.Println(user["id"],user["password"])
		var struct_user User
		struct_user.Account=user["id"].(string)
		struct_user.password=user["password"].(string)
		Info = pgdrive.Querydata(db,struct_user.Account,struct_user.password)
		
		//处理数据库发来的信息
		if Info!= "输入的账号长度不对，要十一位数字，注意是数字"{
			if Info!="输入的密码不正确"{
				if Info!="不存在该账号，需要注册一个吗？"{
					response := Inforation{"存在该用户",Info}
					json, err:= json.Marshal(response)
					//Marshal表示转化为json字符串
					if err != nil {
						http.Error(w, err.Error(), http.StatusInternalServerError)
						return 
					}
					fmt.Println(json)
					w.Write(json)
					return 
				}
			}
		}
		response:= Inforation{Info,Info}
		json, err:= json.Marshal(response)
		//Marshal表示转化为json字符串
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return 
		}
		w.Write(json)
	}
	defer db.Close()
}


func Dealregister(w http.ResponseWriter, r *http.Request){
	//在这里将数据库打开
	dbname := "login" 
	db := pgdrive.GetDB(dbname)
	

	//在这里先先将post请求的内容拿出来
	var Info string     //这个用来承接信息的

	w=Cross(w)    //这个表示跨域的处理
	var user map[string]interface{}
	// var user User
	body,err:=ioutil.ReadAll(r.Body)
	if err!=nil{
		// log.Fatal(err)     //关闭当前文件系统
		fmt.Println(err)
		//发送的数据为，当前的服务器，出现错误，请刷新页面，重新连接
		var info string="连接出现错误，请刷新页面"
		response := Response{info}
		json, _ := json.Marshal(response)
		//Marshal表示转化为json字符串
		if err != nil {

			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Write(json)
		return 
	}
	json.Unmarshal(body,&user)  //这里接收到的数据，承载体是user

	if user!=nil{
		var struct_user User
		struct_user.name=user["name"].(string)
		struct_user.Account=user["id"].(string)
		struct_user.password=user["password"].(string)
		struct_user.phonenumber=user["phonenumber"].(string)
		//将内容传给pgdrive对数据进行存储
		Info = pgdrive.Addata(db,struct_user.name,struct_user.Account,struct_user.password,struct_user.phonenumber)
		//处理数据库发来的信息
		if Info=="昵称已被占用"{
			response := Response{Info}
			json, err := json.Marshal(response)
			if err!=nil{
				w.Write(json)
				return
			}
			w.Write(json)
			return 
		}

		if Info=="该账号已经被占用"{
			response := Response{Info}
			json, err := json.Marshal(response)
			if err!=nil{
				w.Write(json)
				return
			}
			w.Write(json)
			return 
		}

		if Info=="添加成功"{
			response := Response{Info}
			json, err := json.Marshal(response)
			if err!=nil{
				w.Write(json)
				return
			}
			w.Write(json)
			return 
		}
		response :=Response{"系统出现错误"}
		json, err := json.Marshal(response)
		if err!=nil{
			fmt.Println("系统出现错误")
			return   //系统出现错误，因为这里如果再出现json.Marshal就会报错，因此这里先做简单处理，就是在后端打印就行
		}
		w.Write(json)
	}
}


func Dealdisplay(w http.ResponseWriter, r *http.Request){
	//发送数据到前端
	w=Cross(w)    //这个表示跨域的处理
	var user map[string]interface{}  //接收数据
	body,err:=ioutil.ReadAll(r.Body)
	if err!=nil{
		// log.Fatal(err)     //关闭当前文件系统
		fmt.Println(err)
		//发送的数据为，当前的服务器，出现错误，请刷新页面，重新连接
		var info string="连接出现错误，请刷新页面"
		response := Inforation{info,info}
		json, _ := json.Marshal(response)
		//Marshal表示转化为json字符串
		if err != nil {

			http.Error(w, err.Error(), http.StatusInternalServerError)
			return 
		}
		w.Write(json)
		return 
	}
	json.Unmarshal(body,&user)  //这里接收到的数据，承载体是user

	if user!=nil{
		//打开数据库
		dbname:="cartoon"
		db := pgdrive.GetDB(dbname) 
		//解析字符串，从而拿到数据库的表名
		tablename:=user["name"].(string)
		all_data :=pgdrive.Displayinfo(db,tablename)
		//这里是需要处理错误的

		//将all_data全部转化为json
		json, _ := json.Marshal(all_data)
		//发送数据
		w.Write(json)
	}

}


func Displaydelete(w http.ResponseWriter, r *http.Request){
	w=Cross(w)    //这个表示跨域的处理
	var user map[string]interface{}  //接收数据
	body,err:=ioutil.ReadAll(r.Body)
	if err!=nil{
		// log.Fatal(err)     //关闭当前文件系统
		fmt.Println(err)
		//发送的数据为，当前的服务器，出现错误，请刷新页面，重新连接
		var info string="连接出现错误，请刷新页面"
		response := Inforation{info,info}
		json, _ := json.Marshal(response)
		//Marshal表示转化为json字符串
		if err != nil {

			http.Error(w, err.Error(), http.StatusInternalServerError)
			return 
		}
		w.Write(json)
		return 
	}
	json.Unmarshal(body,&user)  //这里接收到的数据，承载体是user

	if user!=nil{
		//打开数据库
		dbname:="cartoon"
		db := pgdrive.GetDB(dbname) 
		//解析字符串，从而拿到数据库的表名
		Name:=user["name"].(string) //这是从前端拿到的数据,一个动漫的名字，一个是用户的名字
		Cartoon_user:=user["cartoon_user"].(string)   

		all_data :=pgdrive.Querydata_delete_cartoon(db,Name,Cartoon_user)
		//这里是需要处理错误的

		//将all_data全部转化为json，这里转化的时候出错勒
		response := Response{all_data}
		json, _ := json.Marshal(response)
		//发送数据
		w.Write(json)
	}

}


//修改数据
func Dealchangedata(w http.ResponseWriter, r *http.Request){
	w=Cross(w)   
	var user map[string]interface{}  //接收数据
	body,err:=ioutil.ReadAll(r.Body)
	if err!=nil{
		// log.Fatal(err)     //关闭当前文件系统
		fmt.Println(err)
		//发送的数据为，当前的服务器，出现错误，请刷新页面，重新连接
		var info string="连接出现错误，请刷新页面"
		response := Inforation{info,info}
		json, _ := json.Marshal(response)
		//Marshal表示转化为json字符串
		if err != nil {

			http.Error(w, err.Error(), http.StatusInternalServerError)
			return 
		}
		w.Write(json)
		return 
	}
	json.Unmarshal(body,&user)  //这里接收到的数据，承载体是user，到这一步是成功的
	fmt.Println(user)

	//如何访问
	if user!=nil{
		dbname:="cartoon"
		db := pgdrive.GetDB(dbname) 
		// var info_user Information
		name:=user["name"].(string)     //强制转化为map的数据类型，以便实现数据的查找
		author:=user["author"].(string)
		Type:=user["type"].(string)
		episodes:=user["episodes"].(string)
		comment:=user["comment"].(string)
		ID:=user["ID"].(string)
		User:=user["User"].(string)
		pgdrive.Modinfo(db,name,author,Type,episodes,comment,ID,User)
	}

}



//添加动漫信息
func Dealadd(w http.ResponseWriter, r *http.Request){
	w=Cross(w)

	var user map[string]interface{}  //接收数据
	var add_info string
	body,err:=ioutil.ReadAll(r.Body)
	if err!=nil{
		// log.Fatal(err)     //关闭当前文件系统
		fmt.Println(err)
		//发送的数据为，当前的服务器，出现错误，请刷新页面，重新连接
		var info string="连接出现错误，请刷新页面"
		response := Inforation{info,info}
		json, _ := json.Marshal(response)
		//Marshal表示转化为json字符串
		if err != nil {

			http.Error(w, err.Error(), http.StatusInternalServerError)
			return 
		}
		w.Write(json)
		return 
	}
	json.Unmarshal(body,&user)  //这里接收到的数据，承载体是user，到这一步是成功的
	fmt.Println(user)

	//为什么要user!=nil，这是因为user会接收一边预连接传输
	if user!=nil{
		dbname:="cartoon"
		db := pgdrive.GetDB(dbname) 
		// var info_user Information
		name:=user["name"].(string)     //强制转化为map的数据类型，以便实现数据的查找
		author:=user["author"].(string)
		Type:=user["type"].(string)
		episodes:=user["episodes"].(string)
		comment:=user["comment"].(string)
		User:=user["User"].(string)
		fmt.Println(name,author,Type,episodes,comment,User)
		add_info=pgdrive.Addinfo(db,name,author,Type,episodes,comment,User)
	}

	//将这个信息传给服务端
	response:=Response{add_info}
	json, _ := json.Marshal(response)
	//Marshal表示转化为json字符串
	if err != nil {

		http.Error(w, err.Error(), http.StatusInternalServerError)
		return 
	}
	w.Write(json)
}


//找回密码
func Dealpassword(w http.ResponseWriter, r *http.Request){
	w=Cross(w)

	var user map[string]interface{}  //接收数据
	body,err:=ioutil.ReadAll(r.Body)
	if err!=nil{
		// log.Fatal(err)     //关闭当前文件系统
		fmt.Println(err)
		//发送的数据为，当前的服务器，出现错误，请刷新页面，重新连接
		var info string="系统出现错误"
		response := Inforation{info,info}
		json, err:= json.Marshal(response)
		//Marshal表示转化为json字符串
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			w.Write(json)
			return 
		}
	}
	json.Unmarshal(body,&user)  //这里接收到的数据，承载体是user，到这一步是成功的
	fmt.Println(user)

	if user!=nil{
		dbname := "login" 
		db := pgdrive.GetDB(dbname)
		var struct_user User
		struct_user.Account=user["id"].(string)
		struct_user.phonenumber=user["phonenumber"].(string)
		Info := pgdrive.Querypassword(db,struct_user.Account,struct_user.phonenumber)
		fmt.Println(Info)
		if Info!= "系统出现错误"{
			if Info!="请输入正确的手机号"{
				if Info!="不存在该账号，需要注册一个吗？"{
					response := Inforation{"存在该用户",Info}
					json, err:= json.Marshal(response)
					//Marshal表示转化为json字符串
					if err != nil {
						http.Error(w, err.Error(), http.StatusInternalServerError)
						return 
					}
					fmt.Println(json)
					w.Write(json)
					return 
				}
			}
		}
		response := Inforation{Info,Info}
		json, err:= json.Marshal(response)
		//Marshal表示转化为json字符串
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return 
		}
		fmt.Println(json)
		w.Write(json)
	}
}
