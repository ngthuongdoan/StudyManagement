const overlayOn = () => {
  document.getElementById("overlay").style.display = "block";
};
const overlayOff = () => {
  document.getElementById("overlay").style.display = "none";
};
const deleteTeacher = () => {
    document.getElementById('message').style.display='block';
    const data = document.getElementsByClassName('teacher');
    for (const el of data) {
        el.classList.add('activerow');
        el.addEventListener('click',()=>{
            document.getElementById('delname').setAttribute('value',el.children[0].innerText);
            document.getElementById('delemail').setAttribute('value',el.children[1].innerText);
            document.getElementById('delnum').setAttribute('value',el.children[2].innerText);
            document.getElementById('delete').submit();
        })
    }
};

