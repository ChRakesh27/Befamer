CREATE DATABASE befarmer;
use befarmer;
CREATE TABLE login(
  id varchar(36) not Null,
  username VARCHAR(20) NOT NULL,
  phone int NOT NULL,
  email VARCHAR(20) NOT NULL,
  password VARCHAR(10) NOT NULL,
  profileImg varchar(226) NOT NULL,
  primary key(id),
  UNIQUE (email)
);

CREATE TABLE land(
	 id varchar(36) not null,
     area varchar(10) not null,
	soil varchar(20) not null,
	surveyno varchar(10) not null,	
     amount int(20) not null,
     district varchar(20) not null,
	 img varchar(20) not null,
     isavailable boolean default true,
     registered varchar(20) default "None",
     primary key(surveyno),
     foreign key (id) references login(id) on delete cascade
);

insert into land (id,area,soil,surveyno,amount,district,img) values('af964553-d059-494f-a41c-b071f36afb66','200','red','15576345',5000,'sircilla','l1.jpg'),('660793a9-81ca-40ee-b58c-146c6b3bfde2','100','black','4556',5000,'hyd','l2.jpg'),('b52b16d6-bcb7-11ed-a0f8-c200b798d254','300','red','247666',5000,'siddipet','l3.jpg'),('b278d9d2-6cc0-4745-8a32-45515100c42b','100','black','451156',5000,'hyd','l2.jpg');
insert into land (id,area,soil,surveyno,amount,district,img) values('af964553-d059-494f-a41c-b071f36afb66','300','black','565',7000,'hyd','l2.jpg');

select * from login;
select * from land;

drop table login;
drop table land;
INSERT INTO login (id,username, phone, email, password, profileImg) VALUES ( uuid() ,'Rakesh',1234567890, 'ra','r','dsfadf');
UPDATE land SET registered='a', isavailable=false  WHERE surveyno='1342556';
SELECT * FROM login where id='c4647a3f-b8fe-11ed-b487-a04b96108f9b';
select ld.*, u.username from land ld, login u where u.id=ld.id;
select uuid()
