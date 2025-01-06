
    let editingRow = null;

    // Image Preview
    function previewImage(event) {
      const imagePreview = document.getElementById('image-preview');
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = function(e) {
        imagePreview.src = e.target.result;
      }

      if (file) {
        reader.readAsDataURL(file);
      }
    }

    // Open Modal to Add User
    document.getElementById('add-new-btn').addEventListener('click', function() {
      editingRow = null;
      document.getElementById('user-modal').style.display = 'flex';
      document.getElementById('modal-title').innerText = 'Add New User';
      document.getElementById('user-name').value = '';
      document.getElementById('user-category').value = '';
      document.getElementById('user-email').value = '';
      document.getElementById('user-projects').value = '';
      document.getElementById('image-preview').src = '';
      document.getElementById('user-status').value = 'complete';
    });

    // Close Modal
    document.getElementById('cancel-btn').addEventListener('click', function() {
      document.getElementById('user-modal').style.display = 'none';
    });

    // Save User
    document.getElementById('save-btn').addEventListener('click', function() {
      const name = document.getElementById('user-name').value;
      const category = document.getElementById('user-category').value;
      const email = document.getElementById('user-email').value;
      const projects = document.getElementById('user-projects').value;
      const status = document.getElementById('user-status').value;
      const imageSrc = document.getElementById('image-preview').src;

      if (name && category && email && projects) {
        const userTableBody = document.getElementById('user-table-body');
        const newRow = document.createElement('tr');

        newRow.innerHTML = `        
          <td><input type="checkbox"></td>
          <td><img src="${imageSrc}" class="image-preview" /> ${name}</td>
          <td>${category}</td>
          <td>${email}</td>
          <td>${projects}</td>
          <td class="status ${status}">${status}</td>
          <td>
            <button onclick="editUser(event)"><i class="fas fa-edit"></i></button>
            <button onclick="deleteUser(event)"><i class="fas fa-trash"></i></button>
            <button onclick="messageUser(event)"><i class="fas fa-comments"></i></button>
          </td>
        `;
        
        if (editingRow) {
          userTableBody.replaceChild(newRow, editingRow);
        } else {
          userTableBody.appendChild(newRow);
        }

        document.getElementById('user-modal').style.display = 'none';
      }
    });

    // Edit User
    function editUser(event) {
      editingRow = event.target.closest('tr');
      const rowData = editingRow.querySelectorAll('td');
      document.getElementById('user-name').value = rowData[1].innerText.trim();
      document.getElementById('user-category').value = rowData[2].innerText;
      document.getElementById('user-email').value = rowData[3].innerText;
      document.getElementById('user-projects').value = rowData[4].innerText;
      document.getElementById('user-status').value = rowData[5].innerText.trim().toLowerCase();
      document.getElementById('modal-title').innerText = 'Edit User';
      document.getElementById('user-modal').style.display = 'flex';
    }

    // Delete User
    function deleteUser(event) {
      const row = event.target.closest('tr');
      row.remove();
    }

    // Delete Selected Users
    document.getElementById('delete-selected-btn').addEventListener('click', function() {
      const checkboxes = document.querySelectorAll('.user-table input[type="checkbox"]:checked');
      checkboxes.forEach(checkbox => {
        const row = checkbox.closest('tr');
        row.remove();
      });
    });

    // Select/Deselect All
    document.getElementById('select-all-checkbox').addEventListener('change', function() {
      const checkboxes = document.querySelectorAll('.user-table input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
      });
    });