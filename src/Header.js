import { Component } from 'react';
import { Link } from 'react-router-dom';
import { MenuAlt3Icon } from "@heroicons/react/solid";
import CaseData from "./CaseData.js";
import FAQ from './FAQ.js';

class Header extends Component {
    constructor(props) {
    super(props);
    this.state = {
      info: {
        cases: {
          today: null,
          cumulative: null,
        },
        tests: {
          today: null,
        },
        recovered: {
            today: null,
            cumulative: null
        },
        deaths: {
            today: null,
            cumulative: null
        }
      },
      faq: [
        { question: 'What vaccines are there against COVID-19 ?', answer: `There are several COVID-19 vaccines validated for use by WHO (given Emergency Use Listing). The first mass vaccination programme started in early December 2020 and the number of vaccination doses administered is updated on a daily basis on the COVID-19 dashboard. The WHO Emergency Use Listing process determines whether a product can be recommended for use based on all the available data on safety and efficacy and on its suitability in low- and middle-income countries. Vaccines are assessed to ensure they meet acceptable standards of quality, safety and efficacy using clinical trial data, manufacturing and quality control processes. The assessment weighs the threat posed by the emergency as well as the benefit that would accrue from the use of the product against any potential risks. In line with their national regulations and legislation, countries have the autonomy to issue emergency use authorizations for any health product.  Domestic emergency use authorizations are issued at the discretion of countries and not subject to WHO approval.` },
        { question: 'What are the benefits of getting vaccinated ?', answer: 'Getting vaccinated could save your life. COVID-19 vaccines provide strong protection against serious illness, hospitalization and death. There is also some evidence that being vaccinated will make it less likely that you will pass the virus on to others, which means your decision to get the vaccine also protects those around you. Even after getting vaccinated, keep taking precautions to protect yourself, family, friends and anyone else you may come into contact with. COVID-19 vaccines are highly effective, but some people will still get ill from COVID-19 after vaccination. There is also still a chance that you could also pass the virus on to others who are not vaccinated. Stay at least 1 metre away from other people, wear a properly fitted mask over your nose and mouth when you can’t keep this distance, avoid poorly ventilated places and settings, clean your hands frequently, stay home if unwell and get tested, and stay informed about how much virus is circulating in the areas where you travel, live and work.' },
        { question: 'Are vaccines safe ?', answer: 'Getting vaccinated could save your life. COVID-19 vaccines provide strong protection against serious illness, hospitalization and death. There is also some evidence that being vaccinated will make it less likely that you will pass the virus on to others, which means your decision to get the vaccine also protects those around you. Even after getting vaccinated, keep taking precautions to protect yourself, family, friends and anyone else you may come into contact with. COVID-19 vaccines are highly effective, but some people will still get ill from COVID-19 after vaccination. There is also still a chance that you could also pass the virus on to others who are not vaccinated. Stay at least 1 metre away from other people, wear a properly fitted mask over your nose and mouth when you can’t keep this distance, avoid poorly ventilated places and settings, clean your hands frequently, stay home if unwell and get tested, and stay informed about how much virus is circulating in the areas where you travel, live and work.' },
        { question: 'Are there side effects from vaccines ?', answer: 'Getting vaccinated could save your life. COVID-19 vaccines provide strong protection against serious illness, hospitalization and death. There is also some evidence that being vaccinated will make it less likely that you will pass the virus on to others, which means your decision to get the vaccine also protects those around you. Even after getting vaccinated, keep taking precautions to protect yourself, family, friends and anyone else you may come into contact with. COVID-19 vaccines are highly effective, but some people will still get ill from COVID-19 after vaccination. There is also still a chance that you could also pass the virus on to others who are not vaccinated. Stay at least 1 metre away from other people, wear a properly fitted mask over your nose and mouth when you can’t keep this distance, avoid poorly ventilated places and settings, clean your hands frequently, stay home if unwell and get tested, and stay informed about how much virus is circulating in the areas where you travel, live and work.' },
        { question: 'When should I get vaccinated ?', answer: 'Getting vaccinated could save your life. COVID-19 vaccines provide strong protection against serious illness, hospitalization and death. There is also some evidence that being vaccinated will make it less likely that you will pass the virus on to others, which means your decision to get the vaccine also protects those around you. Even after getting vaccinated, keep taking precautions to protect yourself, family, friends and anyone else you may come into contact with. COVID-19 vaccines are highly effective, but some people will still get ill from COVID-19 after vaccination. There is also still a chance that you could also pass the virus on to others who are not vaccinated. Stay at least 1 metre away from other people, wear a properly fitted mask over your nose and mouth when you can’t keep this distance, avoid poorly ventilated places and settings, clean your hands frequently, stay home if unwell and get tested, and stay informed about how much virus is circulating in the areas where you travel, live and work.' }
      ]
    };
  }
  componentDidMount() {
        this.fetchCovidInfo();
  }
  fetchCovidInfo() {
    fetch('https://disease.sh/v3/covid-19/countries/zambia')
        .then(response => response.json())
        .then(data => {
          let info = {
            cases: {
              today: data.todayCases,
              cumulative: data.cases,
            },
            tests: {
              today: data.tests
            },
            recovered: {
                today: data.todayRecovered,
                cumulative: data.recovered
            },
            deaths: {
                today: data.todayDeaths,
                cumulative: data.deaths
            }
          }
          this.setState({
            'info': info
          });
           // alert(JSON.stringify(data));
        })
  }

 
    
    render () {

        return (
          <>
            <header className='bg-black' id='header'>
                <div className='flex primary justify-between items-center text-white shadow-md md:px-10 p-4'>
                    <p className='font-bold text-2xl'> CVVS </p>
                    <button className='md:hidden'><MenuAlt3Icon className="h-10 w-10" /></button>
                    

                </div>
                <div className='flex flex-wrap md:flex-nowrap md:px-10 px-5 pt-28'>
                    <div className='w-full'>
                    <h1 className='w-full mb-3 font-bold text-3xl text-white'> ZAMBIA COVID-19 DIGITAL VACCINATION CERTIFICATE </h1>
                    <p className='text-white font-medium text-lg'> Generate and verify covid-19 vaccination certicates on this platform. </p>
                    <div className='flex w-full mt-6'>
                        <Link to='/generate' className='primary text-center block hover:bg-sky-800 text-white p-2 w-32 rounded-lg shadow-md'> Generate </Link>
                        <Link to='/verify' className='bg-green-600 text-center block ml-3 hover:bg-green-700 text-white p-2 w-32 rounded-lg shadow-md'>  Verify </Link>
                    </div>
                    </div>
                    <div className='w-full h-full mt-8 md:mt-0 flex justify-center items-center'>
                      <img src='/covid.png' className='h-60 w-60'/>
                    </div>
                    </div>
                    <div className='w-full mt-4 py-4 flex flex-wrap justify-start items-start'>
                    <CaseData title='Today Cases' color='bg-red-300' value={this.state.info.cases.today} />
                    <CaseData title='Today Tests' color='bg-yellow-300' value={this.state.info.tests.today} />
                    <CaseData title='Cumulative Cases' color='bg-red-500' value={this.state.info.cases.cumulative} />
                    <CaseData title='Today Recovered' color='bg-green-300' value={this.state.info.recovered.today} />
                    <CaseData title='Cumulative Recovered' color='bg-green-300' value={this.state.info.recovered.today} />
                    <CaseData title='Today Deaths' color='bg-green-500' value={this.state.info.deaths.today} />
                    <CaseData title='Cumulative Deaths' color='bg-green-500' value={this.state.info.deaths.cumulative} />
                </div>
            </header>
            <div className='mt-8' id='covid-19-prevention'>
              <img src='/pre.jpg' className='max-w-screen mx-auto' />
            </div>

            <div className='mt-8'>
                <h2 className='font-bold p-4 md:px-10 text-2xl'> FAQ About COVID-19 Vaccination </h2>
                <div className=''>
                  { this.state.faq.map(faq => <FAQ key={faq.question} data={faq} />) }
                </div>
               </div>
               <a href="https://www.moh.gov.zm/?page_id=6553" className='w-11/12 text-center block mx-auto md:1/2 px-3 my-8 bg-green-400 md:mx-10 py-2 rounded-sm font-medium text-white text-lg'> Visit Covid-19 Vaccination Center </a>
            
            <footer className='bg-black p-5'>
              <h3 className='text-white'> All1Zed in partnership with Ministry Of Health. </h3>
            </footer>
            </>
        )
    }
}
export default Header;
