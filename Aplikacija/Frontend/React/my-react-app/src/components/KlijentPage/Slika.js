import axios from 'axios';
import Cookies from 'js-cookie';

const PictureChange = ({ korisnicko_ime, onSuccess }) => {

  const handleChoosePicture = async () => {
    const input = document.createElement('input');
    input.type = 'file';

    input.addEventListener('change', async (event) => {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onloadend = async () => {
          const base64Image = reader.result;

          const format = base64Image.substring(
            base64Image.indexOf('/') + 1,
            base64Image.indexOf(';')
          );

          const fileName = file.name;
          const pictureName = fileName.substring(0, fileName.lastIndexOf('.'));

          console.log('Picture Name:', pictureName);
          console.log('Format:', format);

          const pictureAndFormat = `${pictureName}.${format}`;
          console.log(pictureAndFormat);
          const picturePath = `http://localhost:5169/Resources/Images/${pictureAndFormat}`;
          console.log(picturePath);

          try {
            const picturePathEncoded = encodeURIComponent(picturePath);
            const url = `http://localhost:5169/Korisnik/PostaviSliku/${korisnicko_ime}/${picturePathEncoded}`;
            const headers = {
              'Authorization': `Bearer ${Cookies.get('token')}`,
            };

            await axios.post(url, null, { headers });
            onSuccess(); // Call the success handler
          } catch (error) {
            console.error('Error fetching user info:', error);
          }
        };

        reader.readAsDataURL(file);
      }
    });

    // Trigger the file selection dialog
    input.click();
  };

  return (
    <div>
      <button className="button-primary" onClick={handleChoosePicture}>Promeni sliku</button>
      {/* Render the selected picture here if needed */}
    </div>
  );
};

export default PictureChange;
