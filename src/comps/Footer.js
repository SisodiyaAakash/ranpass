import GitHubIcon from '../assets/media/github.svg';
import InstagramIcon from '../assets/media/instagram.svg';

const Footer = () => {
   return (
      <footer className="footer">
         <div className="footer-inner-wrap container">
            <a className='social-icon' href='https://github.com/SisodiyaAakash'>
               <img src={GitHubIcon} alt="GitHub" />
            </a>
            <a className='social-icon' href='https://instagram.com/aakash.s27'>
               <img src={InstagramIcon} alt="Instagram" />
            </a>
         </div>
      </footer> 
   );
};

export default Footer;
