DROP DATABASE IF EXISTS studymanagement_exp;
create database studymanagement_exp;
use studymanagement_exp;
SET SQL_SAFE_UPDATES = 0;
SET @@global.time_zone = '+00:00';

-- select * from accounts;
-- select * from events; 
-- select * from subjects;
-- select * from teacher	;
-- select * from timetable;

-- drop table accounts;
-- drop table detailSubject;
-- drop table detailEvents;
-- drop table events;
-- drop table grade;
-- drop table semester;
-- drop table subjects;
-- drop table teacher;
-- drop table timetable;


create table accounts(
	username varchar(20) primary key,
    pass varchar(200) not null,
    fullname nvarchar(40) not null,
    accountEmail varchar(100) not null,
    education nvarchar(100),
    avatar varchar(300)
);

create table teacher(
	username varchar(50) references accounts(username),
    teacherName nvarchar(50) not null,
    teacherEmail varchar(100) not null,
    teacherNumber varchar(10),
    constraint pk_teacher primary key (username, teacherEmail)
);

create table events(
	username varchar(20) references accounts(username),
	eventName nvarchar(200) not null,
--  YYYY-MM-DD HH:mm:SS
	eventStartTime datetime not null,
    eventEndTime datetime not null,
	eventPlace nvarchar(200) not null,
    eventNote nvarchar(400),
    eventColor varchar(20),
    constraint pk_events primary key(username,eventName,eventStartTime,eventEndTime,eventPlace)
);

create table subjects(
	username varchar(20) references accounts(username),
	idSubject varchar(10) not null,
    teacherEmail nvarchar(50) references teacher(teacherEmail),
    subjectName nvarchar(50) not null,
    subjectRoom varchar(20) not null,
	subjectWeek varchar(20) not null,
    subjectDay varchar(20) not null,
    subjectStartRecur date not null,
    subjectEndRecur date not null,
	subjectStartTime time not null,
    subjectEndTime time not null,
    subjectTarget varchar(4) not null,
    subjectNote nvarchar(400),
    subjectColor varchar(20),
    id int auto_increment,
    constraint pk_subject primary key(id,username)
);

