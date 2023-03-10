const track = document.getElementById('img-track')

window.onmousedown = e => { 
    track.dataset.mouseDownAt = e.clientX;
}

window.onmousemove = e => {
    if (track.dataset.mouseDownAt === '0') return;

    // subtract starting point with current mousepoint
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
          // max scroll bar width is half of viewport
          maxDelta = window.innerWidth / 2;
    // calc % of mouseDelta 
    const percentage = (mouseDelta / maxDelta) * -100;

    const maxPercentage = (track.scrollWidth - window.innerWidth) / window.innerWidth * -100;
    const nextPercentage = Math.min(Math.max(parseFloat(track.dataset.prevPercentage) + percentage, maxPercentage), 0);

    track.dataset.percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}%, 10%)`
    }, {duration: 1200, fill: "forwards"})

    for (const image of track.getElementsByClassName('img')) {
        image.animate({
            objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: 'forwards'})
    }
}

window.onmouseup = e => {
    track.dataset.mouseDownAt = 0;
    track.dataset.prevPercentage = track.dataset.percentage;
    
 

}
