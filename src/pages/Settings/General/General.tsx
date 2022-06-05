import React from 'react';

import classes from './General.module.scss';

export const General = () => {
  return (
    <div className='tab-pane fade active show' id='account-general'>
      <div className='card-body media align-items-center'>
        <img src='https://bootdey.com/img/Content/avatar/avatar1.png' alt='' className='d-block ui-w-80' />
        <div className='media-body ml-4'>
          <label className='btn btn-outline-primary'>
            Upload new photo
            <input type='file' className='account-settings-fileinput' />
          </label>
          &nbsp;
          <button type='button' className='btn btn-default md-btn-flat'>
            Reset
          </button>
          <div className='text-light small mt-1'>Allowed JPG, GIF or PNG. Max size of 800K</div>
        </div>
      </div>
      <hr className='border-light m-0' />

      <div className='card-body'>
        <div className='form-group'>
          <label className='form-label'>Username</label>
          <input type='text' className='form-control mb-1' value='nmaxwell' />
        </div>
        <div className='form-group'>
          <label className='form-label'>Name</label>
          <input type='text' className='form-control' value='Nelle Maxwell' />
        </div>
        <div className='form-group'>
          <label className='form-label'>E-mail</label>
          <input type='text' className='form-control mb-1' value='nmaxwell@mail.com' />
          <div className='alert alert-warning mt-3'>
            Your email is not confirmed. Please check your inbox.
            <br />
            <a href='!'>Resend confirmation</a>
          </div>
        </div>
        <div className='form-group'>
          <label className='form-label'>Company</label>
          <input type='text' className='form-control' value='Company Ltd.' />
        </div>
      </div>
      {/* <div className='tab-pane fade' id='account-info'> */}
      <div className='card-body pb-2'>
        <div className='form-group'>
          <label className='form-label'>Bio</label>
          <textarea className='form-control' rows={5}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nunc arcu, dignissim sit amet
            sollicitudin iaculis, vehicula id urna. Sed luctus urna nunc. Donec fermentum, magna sit amet
            rutrum pretium, turpis dolor molestie diam, ut lacinia diam risus eleifend sapien. Curabitur ac
            nibh nulla. Maecenas nec augue placerat, viverra tellus non, pulvinar risus.
          </textarea>
        </div>
        <div className='form-group'>
          <label className='form-label'>Birthday</label>
          <input type='text' className='form-control' value='May 3, 1995' />
        </div>
        <div className='form-group'>
          <label className='form-label'>Country</label>
          <select className='custom-select'>
            <option>USA</option>
            <option selected={true}>Canada</option>
            <option>UK</option>
            <option>Germany</option>
            <option>France</option>
          </select>
        </div>
      </div>
      <hr className='border-light m-0' />
      <div className='card-body pb-2'>
        <h6 className='mb-4'>Contacts</h6>
        <div className='form-group'>
          <label className='form-label'>Phone</label>
          <input type='text' className='form-control' value='+0 (123) 456 7891' />
        </div>
        <div className='form-group'>
          <label className='form-label'>Website</label>
          <input type='text' className='form-control' value='' />
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};
