import { forwardRef, useImperativeHandle, useState } from 'react';

const ToggleNewBlogForm = forwardRef(({ children }, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = { display: visible ? 'none' : '' };
  const toggleHidden = { display: visible ? '' : 'none' };

  useImperativeHandle(ref, () => ({
    toggleVisible: () => setVisible(true),
    toggleHidden: () => setVisible(false),
  }));

  return (
    <div>
      <div style={toggleVisible}>
        <button className="toggle-button" onClick={() => setVisible(true)}>
          Create New Blog
        </button>
      </div>
      <div style={toggleHidden}>
        {children}
        <button className="toggle-button" onClick={() => setVisible(false)}>
          Close the Form
        </button>
      </div>
    </div>
  );
});

ToggleNewBlogForm.displayName = 'ToggleNewBlogForm';
export default ToggleNewBlogForm;
