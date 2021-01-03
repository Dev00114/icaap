import React, {Component} from 'react';
import { render } from 'react-dom';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import 'normalize.css/normalize.css';
import '../assets/css/slider-animations.css';
import '../assets/css/styles.css';


const content = [
	{
		title: 'ICAAP and Economic Capital Management',
		description:
		'ICAAP (Internal Capital Adequacy Assessment Process), part of Pillar 2 within the Basel Framework, represents a financial institution’s own assessment of the capital needed to run the business. This capital may differ from the minimum regulatory capital requirement since, for instance, a financial institution may include risks that are not formally subject to the minimum regulatory capital (e.g. liquidity risk, reputational risk, business risk or interest rate risk in the banking book) or may use different parameters or methodologies for credit risk, market risk or operational risk..',
		button: 'Read More',
		image: 'https://www.actuaries.digital/wp-content/uploads/2020/06/iStock-1153082516-1600x750.jpg',
		user: 'Mustafa cavus',
		userProfile: 'https://i.imgur.com/4KeKvtH.png'
	},
	{
		title: 'Tortor Dapibus Commodo Aenean Quam',
		description:
		'Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.',
		button: 'Discover',
		image: 'https://stefanini.com/en/trends/news/5-principles-for-banks-to-manage-climate-change-risks/_jcr_content/root/responsivegrid/articlecontainer/par5/image.coreimg.jpeg/1592246212592/micheile-henderson-zvprbbmt8qa-unsplash.jpeg',
		user: 'Erich Behrens',
		userProfile: 'https://i.imgur.com/0Clfnu7.png'
	},
	{
		title: 'Phasellus volutpat metus',
		description:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.',
		button: 'Buy now',
		image: 'https://mlraan0pnurx.i.optimole.com/c32lz_w-1jsGixPY/w:750/h:500/q:auto/https://opengovasia.com/wp-content/uploads/2020/07/Depositphotos_24194701_original-750x500-2.jpg',
		user: 'Bruno Vizovskyy',
		userProfile: 'https://i.imgur.com/4KeKvtH.png'
	}
];


class Home extends Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <div>
        <Slider className="slider-wrapper">
          {content.map((item, index) => (
            <div
              key={index}
              className="slider-content"
              style={{ background: `url('${item.image}') no-repeat center center` }}
            >
              <div className="inner">
                <h1 style = {{fontFamily : "serif"}}>{item.title}</h1>
                <p style = {{fontFamily : "serif"}}>{item.description}</p>
                <button className = "slider-button">{item.button}</button>
              </div>
              <section>
                <img src={item.userProfile} alt={item.user} />
                <span>
                  Posted by <strong>{item.user}</strong>
                </span>
              </section>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

export default Home;