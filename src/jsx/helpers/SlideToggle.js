const slideToggle = (appRef, group) => {
  const container = appRef.current.querySelector(`.exercise_description_${group}`);
  const button_container = appRef.current.querySelector(`.exercise_button_${group}`);
  /** Slide down. */
  if (!container.classList.contains('active')) {
    container.classList.add('active');
    button_container.classList.add('active');
    button_container.classList.add('active2');
    container.style.height = 'auto';

    /** Get the computed height of the container. */
    const height = `${container.clientHeight}px`;

    /** Set the height of the content as 0px, */
    /** so we can trigger the slide down animation. */
    container.style.height = '0px';

    /** Do this after the 0px has applied. */
    /** It's like a delay or something. MAGIC! */
    setTimeout(() => {
      container.style.height = height;
    }, 0);

    /** Slide up. */
  } else {
    /** Set the height as 0px to trigger the slide up animation. */
    container.style.height = '0px';

    button_container.classList.remove('active');
    /** Remove the `active` class when the animation ends. */
    container.addEventListener('transitionend', () => {
      container.classList.remove('active');
      button_container.classList.remove('active2');
    }, { once: true });
  }
};

export default slideToggle;
