use studymanagementv2;

-- SELLECT
-- Tất cả môn học của user
select * from Subjects as a, Accounts as b
where
	b.username="ngthuongdoan" and
    b.username=a.username;
-- Tất cả semester của user
select * from Semester as a, Accounts as b, Timetable as c
where
	b.username="ngthuongdoan" and
    b.username=c.username and
    c.semesterName=a.semesterName;
-- Tất cả môn của timetable của user
select * from Subjects as a, Accounts as b, Timetable as c, Semester as e
where
	b.username="ngthuongdoan" and
    b.username=a.username and
    b.username=c.username and
    c.semesterName=e.semesterName and
    c.startTime=e.startTime and
    c.endTime=e.endTime and
    e.subjectId=a.subjectID;
-- Tất cả event và subject trong 1 timetable
select (a.eventName, b.subjectId) from Events as a, Subjects as b, Accounts as c, Timetable as d, Semester as e
where 
	c.username="ngthuongdoan" and
    c.username=a.username and
    c.username=b.username and
    c.username=d.username and
	d.semesterName=e.semesterName and
    d.startTime=e.startTime and
    d.endTime=e.endTime and
    e.subjectId=b.subjectId