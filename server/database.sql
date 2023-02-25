CREATE DATABASE befarmer;
use befarmer;
CREATE TABLE login(
  username VARCHAR(20) NOT NULL,
  phone int NOT NULL,
  email VARCHAR(20) NOT NULL,
  password VARCHAR(10) NOT NULL,
  primary key(email) 
);

CREATE TABLE land(
	 email varchar(20) not null,
     area varchar(10) not null,
	soil varchar(20) not null,
	surveyno varchar(10) not null,	
     amount int(20) not null,
     district varchar(20) not null,
	 img varchar(20) not null,
     isavailable boolean default true,
     registered varchar(20) default "None",
     primary key(surveyno),
     foreign key (email) references login(email) on delete cascade
);

insert into land (email,area,soil,surveyno,amount,district,img) values('r','200','red','142345',5000,'sircilla','l1.jpg'),('s','100','black','1342556',5000,'hyd','l2.jpg'),('v','300','red','235466',5000,'siddipet','l3.jpg');

insert into land (email,area,soil,surveyno,amount,district,img,isavailable) values('r','200','red',"1456",5000,'sircilla','l2.jpg',false),('v','300','red',"1256",5000,'siddipet','l4.jpg',false);

select * from land;
drop table land;
select land.*, login.* from land, login where login.email=land.email and ;
INSERT INTO login (username, phone, email, password) VALUES ('srikanth',1234567890, 's','s');
UPDATE land SET registered='a', isavailable=false  WHERE surveyno='1342556';
SELECT * FROM login;
