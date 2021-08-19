import React from 'react'

export const Footer = () => {
    let myst={position: 'absolute', 
    top: "82vh", 
    width: "100%" }
    return (
        
<footer class="page-footer font-small special-color-dark pt-4 my-3" style={myst }>


  <div class="container" >


    <ul class="list-unstyled list-inline text-center">
      <li class="list-inline-item">
        <a class="btn-floating btn-fb mx-1" href="https://m.facebook.com/aaryan.garhewal">
          <i class="fab fa-facebook-f"> </i>
        </a>
      </li>
      <li class="list-inline-item">
        <a class="btn-floating btn-tw mx-1" href="https://twitter.com/AaryanGarhewal">
          <i class="fab fa-twitter"> </i>
        </a>
      </li>
      <li class="list-inline-item">
        <a class="btn-floating btn-gplus mx-1">
          <i class="fab fa-google-plus-g"> </i>
        </a>
      </li>
      <li class="list-inline-item">
        <a class="btn-floating btn-li mx-1" href='https://www.linkedin.com/in/aaryangarhewal/'>
          <i class="fab fa-linkedin-in"> </i>
        </a>
      </li>
      <li class="list-inline-item">
        <a class="btn-floating btn-dribbble mx-1">
          <i class="fab fa-dribbble"> </i>
        </a>
      </li>
    </ul>
    

  </div>
  
  <div class="footer-copyright text-center py-0">© 2021 Copyright:
    <a className="text-center" href="#"> MyNoteApp.com </a>
  </div>
  

</footer>

    )
}
