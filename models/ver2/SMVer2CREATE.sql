DROP DATABASE IF EXISTS studymanagement_exp;
create database studymanagement_exp;
use studymanagement_exp;

select * from accounts;
select * from detailSubject;
select * from detailEvent;
select * from events;
select * from grade;
select * from semester;
select * from subjects;
select * from teacher;
select * from timetable;

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

create table grade(
	username varchar(50) references accounts(username),
    idSubject varchar(10) references subjects(idSubject),
	gradeNumber int not null,
    timeGet datetime not null,
    constraint pk_grade primary key (idSubject,username,timeGet)
);

create table semester(
	username varchar(50) references accounts(username),
    semesterName nvarchar(50) not null,
    -- YYYY-MM-DD 
    semesterStartTime date not null,
    semesterEndTime date,
	constraint pk_semester primary key (username, semesterName)
);

create table events(
	username varchar(20) references accounts(username),
	eventName nvarchar(200) not null,
--  YYYY-MM-DD HH:mm:SS
	eventTime datetime not null,
	eventPlace nvarchar(200) not null,
    eventNote nvarchar(400),
    eventColor varchar(20),
    constraint pk_events primary key(username,eventName,eventTime,eventPlace)
);

create table subjects(
	username varchar(20) references accounts(username),
	idSubject varchar(10) not null,
    teacherEmail nvarchar(50) references teacher(teacherEmail),
    subjectName nvarchar(50) not null,
    subjectRoom varchar(20),
	subjectWeek varchar(20) not null,
    subjectStudyTime varchar(100) not null,
    subjectTarget varchar(4) not null,
    subjectNote nvarchar(400),
    subjectColor varchar(20),
    constraint pk_subject primary key(username,idSubject,subjectStudyTime)
);

create table timetable(
	username varchar(20) references accounts(username),
    timetableName varchar(50) not null,
--     0123456 for monday,tuesday,wednesday,thursday,friday,saturday,sunday
    timetableStartTime varchar(50) not null,
    timetableEndTime varchar(50) not null,
	semesterName nvarchar(50) not null references semester(semesterName),
    semesterStartTime varchar(100) not null references semester(semesterStartTime),
    semesterEndTime varchar(100) references semester(semesterEndTime),
	constraint pk_timetable primary key(username,timetableName,semesterName)
);

create table detailSubject(
	username varchar(20) references accounts(username),
	timetableName varchar(50) not null references timetaaccountsble(timetableName),
--     0123456 for monday,tuesday,wednesday,thursday,friday,saturday,sunday
    timetableStartTime varchar(50) not null references timetable(timetableStartTime),
    timetableEndTime varchar(50) not null references timetable(timetableEndTime),
	idSubject varchar(10) not null references subjects(idSubject),
	semesterName nvarchar(50) not null references semester(semesterName),
	constraint pk_detail_subject primary key (username,timetableName,idSubject,semesterName)
);

create table detailEvent(
	username varchar(20) references accounts(username),
	timetableName varchar(50) not null references timetaaccountsble(timetableName),
--     0123456 for monday,tuesday,wednesday,thursday,friday,saturday,sunday
    timetableStartTime varchar(50) not null references timetable(timetableStartTime),
    timetableEndTime varchar(50) not null references timetable(timetableEndTime),
	eventName nvarchar(200) not null references events(eventName),
	eventTime nvarchar(200) not null references events(eventTime),
	eventPlace nvarchar(200) not null references events(eventPlace),
	semesterName nvarchar(50) not null references semester(semesterName),
	constraint pk_detail_event primary key (username,timetableName,eventName,semesterName)
);

