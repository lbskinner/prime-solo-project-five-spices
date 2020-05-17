import React from "react";

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
    <div>
      <h1>
        {" "}
        About Five<sup>⑤</sup> Spices
      </h1>
      <p>
        I am currently a full stack software engineering student at Prime
        Digital Academy. Five<sup>⑤</sup> Spices was created as part of the
        program as my two-week solo project. Five<sup>⑤</sup> Spices is an
        online recipe management application that allows registered users to
        create their own recipe book with recipes they have created or imported
        from other recipe sites. The application offers the ability to create,
        view, update and delete recipes, as well as allowing users to save a
        recipe from another site and make changes based on their preferences.
      </p>
      <p>
        The code can be found on{" "}
        <a
          href="https://github.com/lbskinner/prime-solo-project-five-spices/tree/master"
          target="_black"
        >
          GitHub
        </a>
        .
      </p>
      <p>
        Prime Digital Academy offers an immersive full-time full stack software
        engineering program that prepares students with modern technologies and
        critical behavior skills for a job in the software engineering industry
        in 20 weeks.
      </p>
      <p>Leila Skinner</p>
      <a href="https://www.linkedin.com/in/leilaskinner/" target="_black">
        My Linkedin
      </a>
    </div>
  </div>
);

export default AboutPage;
