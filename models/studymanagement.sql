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
	idTimetable int auto_increment primary key,
    username varchar(20) references accounts(username),
    timetableName varchar(20) not null,
    periods int not null,
--     12345678 for monday,tuesday,wednesday,thursday,friday,saturday,sunday
    startDay int not null,
    endDay int not null
);

create table teacher(
	idTeacher int auto_increment primary key,
    teacherName nvarchar(50) not null,
    teacherEmail varchar(100),
    teacherNumbar varchar(10)
);

create table subjects(
	idSubject varchar(10) primary key,
	idTeacher int references teacher(idTeacher),
    subjectName nvarchar(50) not null,
    room varchar(20),
    studyTime varchar(100) not null,
    note nvarchar(400)
);

create table include(
	idInclude int auto_increment primary key,
	idSubject varchar(10) references subjects(idSubject),
	idTimetable int references timetable(idTimetable)
);

create table grade(
    idSubject varchar(10) references subjects(idSubject),
	gradeNumber int not null,
    timeGet varchar(40) not null,
    constraint pk_grade primary key (idSubject,timeGet)
);

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