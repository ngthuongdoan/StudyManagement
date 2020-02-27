create database studymanagement;
use studymanagement;

create table accounts(
	username varchar(20) primary key,
    pass varchar(200) not null,
    fullname nvarchar(40) not null,
    accountEmail varchar(100) not null,
    education nvarchar(100),
    avatar varchar(300),
    firsttime boolean not null
);
drop table accounts;
create table timetable(
    username varchar(50) references accounts(username),
    timetableName varchar(50) not null,
    periods int not null,
--     12345678 for monday,tuesday,wednesday,thursday,friday,saturday,sunday
    startDay int not null,
    endDay int not null,
    primary key(username,timetableName)
);
drop table timetable;
create table teacher(
    teacherName nvarchar(50) not null,
    teacherEmail varchar(100) not null,
    teacherNumber varchar(10),
    primary key (teacherName, teacherEmail)
);
drop table teacher;
create table subjects(
	idSubject varchar(10) primary key,
	teacherName nvarchar(50) references teacher(teacherName),
    teacherEmail nvarchar(50) references teacher(teacherEmail),
    subjectName nvarchar(50) not null,
    room varchar(20),
    studyTime varchar(100) not null,
    note nvarchar(400)
);
drop table subjects;
create table include(
	idSubject varchar(10) references subjects(idSubject),
	timetableName varchar(50) references timetable(timetableName),
    username varchar(20) references accounts(username),
    primary key(idSubject,timetableName,username)
);
drop table include;
create table grade(
    idSubject varchar(10) references subjects(idSubject),
	gradeNumber int not null,
    timeGet nvarchar(40) not null,
    constraint pk_grade primary key (idSubject,timeGet)
);
drop table grade;
-- insert data
--     12345678 for monday,tuesday,wednesday,thursday,friday,saturday,sunday
insert into timetable values('ngthuongdoan','Untitled 1',9,1,6);
insert into timetable values('ngthuongdoan','Untitled 2',9,1,6);

insert into teacher value('Thái Minh Tuấn','tmtuan@cit.ctu.edu.vn','');
insert into teacher value('Huỳnh Quang Nghi','hqnghi@cit.ctu.edu.vn','');

insert into subjects values('CT22301','Thái Minh Tuấn','tmtuan@cit.ctu.edu.vn','Quản lý dự án phần mềm','203/C1','Tuesday 345','');
insert into subjects values('CT24601','Huỳnh Quang Nghi','hqnghi@cit.ctu.edu.vn','.NET','TH24DI','Thursday 15','');

insert into include values('CT22301','Untitled 1','ngthuongdoan');
insert into include values('CT24601','Untitled 2','ngthuongdoan');

insert into grade value('CT22301','9','Cuối kì');
insert into grade value('CT22301','7','Giữa kì');
-- select all
select * from accounts;
select * from timetable;
select * from teacher;
select * from subjects;
select * from include;
select * from grade;
-- Get all timetable
select b.timetableName from accounts as a, timetable as b 
where
	a.username='ngthuongdoan' and
    a.username=b.username
;
-- Get all grades from account
select gradeNumber from accounts as a, timetable as b, include as c, subjects as d, grade as e
where
	a.username='ngthuongdoan' and
    a.username=b.username and
    b.idTimetable=c.idTimetable and 
    c.idSubject=d.idSubject and
    d.idSubject=e.idSubject;
-- Get all grades of a subject from account
select gradeNumber from accounts as a, timetable as b, include as c, subjects as d, grade as e
where
	a.username='ngthuongdoan' and
    a.username=b.username and
    b.idTimetable=c.idTimetable and 
    c.idSubject='CT112' and
    c.idSubject=d.idSubject and
    d.idSubject=e.idSubject;