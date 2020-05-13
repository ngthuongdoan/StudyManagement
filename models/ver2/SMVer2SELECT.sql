use studymanagement_exp;

-- SELLECT
-- Tất cả môn học của user
select a.* from subjects as a, accounts as b
where
	b.username="ngthuongdoan" and
    b.username=a.username;
-- Tất cả semester của user
select a.* from semester as a, accounts as b, timetable as c
where
	b.username="ngthuongdoan" and
    b.username=c.username and
    c.semesterName=a.semesterName;
    
-- Tất cả môn của timetable của user
select a.* from subjects as a, accounts as b, detailSubject as c
where
	b.username="ngthuongdoan" and
    c.timetableName="Tuần 1" and
    c.semesterName="HK2 2019-2020" and
    b.username=c.username and
    c.idSubject=a.idSubject
;
-- Tất cả event và subject trong 1 timetable
select a.idSubject, b.eventName from subjects as a, events as b, accounts as c, semester as d, timetable as e, detailSubject as f, detailEvent as g
where
	c.username="ngthuongdoan" and
    d.semesterName="HK2 2019-2020" and
    e.timetableName="Tuần 1" and
    c.username=f.username and
    d.semesterName=f.semesterName and
    e.timetableName=f.timetableName and
    f.idSubject=a.idSubject and
    c.username=g.username and
    d.semesterName=g.semesterName and
    e.timetableName=g.timetableName and
    g.eventName=b.eventName and
    g.eventTime=b.eventTime and
    g.eventPlace=b.eventPlace
    ;