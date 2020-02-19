create database testing;
use testing;

create table accounts(
	username varchar(20) not null primary key,
    pass varchar(20) not null,
    fullname nvarchar(50) not null,
	email varchar(50) not null,
    education varchar(40) not null
);
insert into accounts value('admin','admin','admin','example@admin.com','Example');
select * from accounts