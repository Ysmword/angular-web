package pgdrive


import(
	"database/sql"
	_"github.com/lib/pq"    //导入这个库，用来做驱动
	"fmt"
	"log"
)

const(
	host = "localhost"
	port = 5432
	user = "postgres"
	password = ""
)  //这个用来连接数据库的数据


//因为我这是登录的操作，创建的结构体就只有id 账号 密码
type User struct{
	ID string
	name string
	Account string
	password string
	phonenumber string 
}

type Information struct{
	ID string
	name string
	author string
	Type  string
	episodes string
	comment string
}






//连接数据库
func GetDB(dbname string) *sql.DB{
	//dbname表示的是数据库的名字，这是用来给选者数据库的打开的操作的

	//格式化输出，相当于添加数据
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",host,port,user,password,dbname) 
	//链接数据库，其中dbname的意思为数据库的名字
	db,err:=sql.Open("postgres",psqlInfo)

	//错误的处理
	if err!=nil{
		log.Fatal(err)  //打印错误，并且system exit    //因为这是我上机的时候的操作，因此不用考虑到用户的问题
		return nil
	}
	err = db.Ping()   //验证是否连接成功
	if err!=nil{
		log.Fatal(err)
		return nil
	}

	//数据库连接成功之后，就打印数据库连接成功的信息
	fmt.Println("sucessfull connected!")

	return db
}


//查询数据库里面的数据,这个是user的数据库的查询
func Querydata(db *sql.DB,Account string,password string)string{


	if len(Account)!=11{
		//返回错误，并且返回数据信息
		fmt.Println("账号的长度不对")
		return "输入的账号长度不对，要十一位数字，注意是数字"
	}

	//这个数据是用来判断用户信息的,和拿到该用户的昵称
	var a int=0
	var name string

	rows,err :=db.Query("select * from users")  
	 //数据库的查询,他会冲数据库中获取查询结果（一系列行，可能为空）
	//db.Query回返回的结果为一系列的行和错误
	if err!=nil{
		// log.Fatal(err)
		fmt.Println(err)
		return ""    //返回的字符串为空的时候，需要在用dealfront处理
	}

	defer db.Close()

	user :=User{}  //这个是结构体定义变量

	for rows.Next(){
		//使用rows.Next()作为循环条件，迭代读取结果集
		err := rows.Scan(&user.ID,&user.name,&user.Account,&user.password,&user.phonenumber)
		//使用rows.Scan从结果集中获取一行结果，他接受变量的地址
		if err!=nil{
			// log.Fatal(err)
			return ""
		}

		if user.Account == Account{
			if user.password != password{
				fmt.Println("输入的密码不正确")
				return "输入的密码不正确"
			}else{
				a=1
				name = user.name
			}
		}

	}
	defer rows.Close()
	//关闭结果集，释放连接，防止资源的泄露

	//如果上面的判断都不通过，就在这里说明情况
	if a==0{
		//这里用来放回数据
		fmt.Println("不存在该账号")
		return "不存在该账号，需要注册一个吗？"
	}

	fmt.Println("存在该用户")
	//这里实现数据的查找

	return name
}


//注册信息的操作
func Addata(db *sql.DB,name string,Account string,password string,phonenumber string)string{

	//对数据进行处理
	rows,err :=db.Query("select * from users") 
	//db.Query回返回的结果为一系列的行和错误
	if err!=nil{

		//直接说是系统出现错误
		Info := "系统出现错误"
		return Info
	}
	var user User

	//这里查询数据
	for rows.Next(){
		err := rows.Scan(&user.ID,&user.name,&user.Account,&user.password,&user.phonenumber)
		//使用rows.Scan从结果集中获取一行结果，他接受变量的地址
		if err!=nil{
			fmt.Println(err)
			return "系统出现错误"
		}
		if user.name==name{
			return "昵称已被占用"
		}
		if user.Account==Account{
			return "该账号已经被占用"
		}
	}
	rows.Close()

	//添加数据
	stmt,err := db.Prepare("insert into users (name,Account,password,phonenumber) values($1,$2,$3,$4)")

	if err !=nil{
		// log.Println(err)
		info := "添加失败，系统出现错误"
		return info
	}

	res,err := stmt.Exec(name,Account,password,phonenumber)

	if err != nil{
		// fmt.Println(err)
		info := "添加失败，系统出现错误"
		return info
	}

	//给该用户一个数据库，以用户的昵称进行命名
	var Info string     //用来接收数据
	Info=addTable(name)

	if Info!=""{
		return "系统出现错误,创建表单的时候出现错误"
	}

	info := "添加成功"
	fmt.Println(res)

	defer db.Close()     //防止数据库的内存泄露
	return info
}

//给该用户一个数据库，以用户的昵称进行命名
func addTable(name string)string{
	dbname := "cartoon" 
	db := GetDB(dbname)
	Create_table_info := fmt.Sprintf("create table %s (id serial primary key,name text,author text,type text,episodes text,comment text)",name)
	stmt,err := db.Prepare(Create_table_info)
	if err!=nil{
		// log.Println(err)
		return "系统出现错误"
	}
	res,err :=stmt.Exec()
	if err!=nil{
		// log.Println(err,"这是执行命令行出现的错误")
		return "系统出现错误"
		
	}
	fmt.Println("添加表成功！",res)
	defer db.Close()    //防止数据库的内存泄露
	return ""
}


//显示所有的数据
func Displayinfo(db *sql.DB,tablename string)interface{} {

	//这个是用来装数据的
	all_data := make(map[string]map[string]string)


	//先格式化输出
	table_cmd:=fmt.Sprintf("select * from %s",tablename)

	rows,err :=db.Query(table_cmd)  
	 //数据库的查询,他会冲数据库中获取查询结果（一系列行，可能为空），并且QueryRow表示只返回一行的查询结果,这里可进行查找
	//db.Query回返回的结果为一系列的行和错误
	if err!=nil{
		// log.Fatal(err)
		fmt.Println(tablename)
		if tablename==""{
			return "系统出现错误1，为什么是这里错了呢？"+tablename
		}
	}

	var info Information     
	
	for rows.Next(){
		err := rows.Scan(&info.ID,&info.name,&info.author,&info.Type,&info.episodes,&info.comment)
		//使用rows.Scan从结果集中获取一行结果，他接受变量的地址
		if err!=nil{
			fmt.Println(err)
			return "系统出现错误2"
		}

		all_data[info.ID] = make(map[string]string)
		//写入map
		all_data[info.ID]["name"]=info.name
		all_data[info.ID]["author"]=info.author
		all_data[info.ID]["Type"]=info.Type
		all_data[info.ID]["episodes"]=info.episodes
		all_data[info.ID]["comment"]=info.comment
		all_data[info.ID]["ID"]=info.ID
	}

	fmt.Println(all_data)
	rows.Close()

	return all_data

}



//查询特定用户的数据库里面的信息,并且删除信息
func Querydata_delete_cartoon(db *sql.DB,Name string,Cartoon_user string)string{

	var name string

	table_cmd:=fmt.Sprintf("select * from %s",Cartoon_user)
	rows,err :=db.Query(table_cmd)  
	 //数据库的查询,他会冲数据库中获取查询结果（一系列行，可能为空）
	//db.Query回返回的结果为一系列的行和错误
	if err!=nil{
		// log.Fatal(err)
		fmt.Println(err)
		return ""    //返回的字符串为空的时候，需要在用dealfront处理
	}

	defer db.Close()

	var info Information  //这个是结构体定义变量

	for rows.Next(){
		err := rows.Scan(&info.ID,&info.name,&info.author,&info.Type,&info.episodes,&info.comment)
		//使用rows.Scan从结果集中获取一行结果，他接受变量的地址
		if err!=nil{
			fmt.Println(err)
			return "系统出现错误2"
		}

		if info.name==Name{
			cmd:=fmt.Sprintf("delete from %s where name=",Cartoon_user)    //执行删除的命令
			stmt,err:=db.Prepare(cmd+"$1")
			if err!=nil{
				fmt.Println(err)
				return "系统出现错误4,Cartoon_user="+Cartoon_user+"Name="+Name
			}
			res,err :=stmt.Exec(Name)
			if err!=nil{
				return "系统出现错误5,Cartoon_user="+"Name="+Name
			}
			fmt.Println(res)
			}
	}
	defer rows.Close()
	//关闭结果集，释放连接，防止资源的泄露
	name="删除成功"

	return name
}


//修改信息
func Modinfo(db*sql.DB,name string,author string,Type string,episodes string,comment string,ID string,User string)string{
	fmt.Println("上面的正确吗？")
	//下面就是更新数据的操作了
	//修改名字
	str1:=updata_data(db,User,name,ID,"name")
	if str1!=""{
		return "修改失败，系统出现故障"
	}
	fmt.Println(name)
	//修改作者名字
	str2:=updata_data(db,User,author,ID,"author")
	if str2!=""{
		return "修改失败，系统出现故障"
	}
	fmt.Println(author)
	//修改作品类型
	str3:=updata_data(db,User,Type,ID,"type")
	if str3!=""{
		return "修改失败，系统出现故障"
	}
	fmt.Println(Type)
	//修改作品的集数
	str4:=updata_data(db,User,episodes,ID,"episodes")
	if str4!=""{
		return "修改失败，系统出现故障"
	}
	fmt.Println(episodes)
	//修改用户对改作品的评论
	str5:=updata_data(db,User,comment,ID,"comment")
	if str5!=""{
		return "修改失败，系统出现故障"
	}
	fmt.Println(comment)
	defer db.Close()
	return "修改成功"
}


//集成用来更新数据,不用因为里面的东西是属性的名字还是需要制作的
func updata_data(db*sql.DB,User string,any_str string,ID string,need string)string{
	cmd:=fmt.Sprintf("update %s set %s=",User,need)
	stmt,err:=db.Prepare(cmd+"$1"+"where id=$2")
	if err!=nil{
		fmt.Println(err)
		return "系统出现错误4"
	}
	res,err:=stmt.Exec(any_str,ID)
	if err!=nil{
		return "系统出现错误5"
	}
	fmt.Println(res)
	defer stmt.Close()
	return ""
	//一个问题就是只能更改一次值
}



//添加对应用户的动漫信息
func Addinfo(db*sql.DB,name string,author string,Type string,episodes string,comment string,User string)string{
	//添加数据

	fmt.Println(name,author,Type,episodes,comment)  //用来调试

	//这里需要对数据进行判断，就对动漫的名字进行判断
	cmd1:=fmt.Sprintf("select * from %s",User)
	rows,err :=db.Query(cmd1) 
	//db.Query回返回的结果为一系列的行和错误
	if err!=nil{

		//直接说是系统出现错误
		Info := "系统出现错误"
		return Info
	}
	var info Information

	//这里查询数据
	for rows.Next(){
		err := rows.Scan(&info.ID,&info.name,&info.author,&info.Type,&info.episodes,&info.comment)
		//使用rows.Scan从结果集中获取一行结果，他接受变量的地址
		if err!=nil{
			fmt.Println(err)
			return "系统出现错误"
		}
		if info.name==name{
			return "已存在这部动漫"
		}
	}
	defer rows.Close()


	cmd:=fmt.Sprintf("insert into %s",User)
	stmt,err := db.Prepare(cmd+"(name,author,type,episodes,comment) values ($1,$2,$3,$4,$5)")
	
	if err!=nil{
		fmt.Println(err)
		return "系统出现错误"
	}
	
	rs,err:=stmt.Exec(name,author,Type,episodes,comment)

	if err!=nil{
		fmt.Println(err)
		return "系统出现错误"
	}
	fmt.Println("添加成功",rs)

	defer stmt.Close()
	
	return "添加成功"
}




//查找用户的密码
func Querypassword(db*sql.DB,Account string,phonenumber string)string{

	var a int=0
	var password string

	rows,err :=db.Query("select * from users")  
	if err!=nil{
		// log.Fatal(err)
		fmt.Println(err)
		return ""    
	}

	defer db.Close()

	user :=User{}  

	for rows.Next(){
		err := rows.Scan(&user.ID,&user.name,&user.Account,&user.password,&user.phonenumber)
		if err!=nil{
			return "系统出现错误"
		}

		if user.Account == Account{
			if user.phonenumber != phonenumber{
				fmt.Println("输入的手机号码不正确")
				return "请输入正确的手机号"
			}else{
				a=1
				password = user.password
			}
		}

	}
	defer rows.Close()
	if a==0{
		//这里用来放回数据
		fmt.Println("不存在该账号")
		return "不存在该账号，需要注册一个吗？"
	}

	fmt.Println("存在该用户")
	return password
}




