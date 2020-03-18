create database studymanagement;
use studymanagement;

create table accounts(
	username varchar(20) primary key,
    pass varchar(200) not null,
    fullname nvarchar(40) not null,
    accountEmail varchar(100) not null,
    education nvarchar(100),
    avatar varchar(300)
);
drop table accounts;
create table timetable(
    username varchar(50) references accounts(username),
    timetableName varchar(50) not null,
    periods int not null,
--     0123456 for monday,tuesday,wednesday,thursday,friday,saturday,sunday
    startDay int not null,
    endDay int not null,
    primary key(username,timetableName)
);
drop table timetable;
create table teacher(
	username varchar(50) references accounts(username),
    teacherName nvarchar(50) not null,
    teacherEmail varchar(100) not null,
    teacherNumber varchar(10),
    primary key (username, teacherName, teacherEmail)
);
drop table teacher;
create table subjects(
	username varchar(20) references accounts(username),
	idSubject varchar(10) not null,
	teacherName nvarchar(50) references teacher(teacherName),
    teacherEmail nvarchar(50) references teacher(teacherEmail),
    subjectName nvarchar(50) not null,
    room varchar(20),
    studyTime varchar(100) not null,
    target varchar(4) not null,
    note nvarchar(400),
    color varchar(20),
    primary key(username,idSubject,studyTime)
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
--     0123456 for monday,tuesday,wednesday,thursday,friday,saturday,sunday
insert into timetable values('ngthuongdoan','Untitled 1',9,0,5);
-- insert into timetable values('ngthuongdoan','Untitled 2',9,0,6);

insert into teacher value('ngthuongdoan','Thái Minh Tuấn','tmtuan@cit.ctu.edu.vn','');
insert into teacher value('ngthuongdoan','Huỳnh Quang Nghi','hqnghi@cit.ctu.edu.vn','0123456789');

insert into subjects values('ngthuongdoan','CT22301','Thái Minh Tuấn','tmtuan@cit.ctu.edu.vn','Quản lý dự án phần mềm','203/C1','1 35;2 35','8.5','','');
-- insert into subjects values('ngthuongdoan','CT24601','Huỳnh Quang Nghi','hqnghi@cit.ctu.edu.vn','.NET','TH24DI','3 15','7.2','','#5FFF3D');

insert into include values('CT22301','Untitled 1','ngthuongdoan');
-- insert into include values('CT24601','Untitled 2','ngthuongdoan');

insert into grade value('CT22301','9','Cuối kì');
insert into grade value('CT22301','7','Giữa kì');
-- select all
select * from sessions;
select * from accounts;
select * from timetable;
select * from subjects;
select * from include;
select * from grade;

select a.* from subjects as a, include as b
where
	b.timetableName = 'Untitled 1' and
    b.username='ngthuongdoan' and
    b.idSubject = a.idSubject
;
-- Get all teacher
select a.* from teacher as a, accounts as b, include as c, subjects as d
where
	b.username='ngthuongdoan' and
    b.username=c.username and
    c.idSubject= d.idSubject and
    d.teacherName=a.teacherName and
    d.teacherEmail=a.teacherEmail
;
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