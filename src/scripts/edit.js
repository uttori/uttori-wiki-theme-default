import slugify from 'slugify';
import config from './config';

document.addEventListener('DOMContentLoaded', () => {
  const dropzone = new Dropzone('.dropzone');

  dropzone.on('success', (file, responseText) => {
    // read the upload path from the elements data-upload attribute.
    const uploadPath = dropzone.element.getAttribute('data-upload') + responseText;
    let linkToUploadedFile = `(${uploadPath})`;
    if (file.type.startsWith('image/')) {
      linkToUploadedFile = `![]${linkToUploadedFile}`;
    } else {
      linkToUploadedFile = `[${responseText}]${linkToUploadedFile}`;
    }
    const textarea = document.querySelector('textarea.content');
    textarea.value = `${textarea.value}\n${linkToUploadedFile}\n`;
  });

  // Update Title / Slug
  const updateFormAction = (event) => {
    const slug = slugify(event.target.value, {
      replacement: '-',
      lower: true,
    });
    const form = document.querySelector('.edit form');
    if (form) {
      form.action = `/${slug}/save`;
    }
    const input = document.querySelector('input.slug');
    if (input) {
      input.value = slug;
    }
  };
  const title = document.querySelector('.edit input.title');
  title.addEventListener('input', updateFormAction);
  title.addEventListener('propertychange', updateFormAction);
  title.addEventListener('paste', updateFormAction);

  // Delete
  const deleteButton = document.querySelector('.edit .delete');
  if (deleteButton) {
    deleteButton.addEventListener('click', (event) => {
      if (!window.confirm('Are you sure you want to delete this document?')) {
        event.preventDefault();
      }
    });
  }

  // reCaptcha
  if (typeof grecaptcha !== 'undefined' && config.reCaptcha) {
    grecaptcha.ready(() => {
      grecaptcha.execute(config.reCaptcha, { action: 'edit' }).then((token) => {
        const captcha = document.querySelector('input#g-recaptcha-response');
        if (captcha) {
          captcha.value = token;
        }
      });
    });
  }
});
