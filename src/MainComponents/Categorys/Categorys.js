import React, { useState, useEffect } from "react";
 import "./nav.css";

function Categorys() {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);
  

  const Url = "http://77.37.45.2:1000/api/v1/category/savecategory";
  const SubUrl = 'http://77.37.45.2:1000/api/v1/subcategory/savesubcategory';
  const updateUrl = "http://77.37.45.2:1000/api/v1/category/updatecategory";
  
  
 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://77.37.45.2:1000/api/v1/category/fetchallcategories');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setCategories(data.map(cat => ({ id: cat.id, name: cat.name, subCategories: cat.subCategories || [] })));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchCategories();
  }, []);

  const handleEdit = (index) => {
    setCategoryName(categories[index].name);
    setEditIndex(index);
    setEditCategoryId(categories[index].id);
    setShowCategoryModal(true);
  };

  const handleDelete = async (index) => {
    const categoryId = categories[index].id; 
    await deleteCategoryFromServer(categoryId); 
    let updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  const deleteCategoryFromServer = async (id) => {
    try {
      const response = await fetch(`http://77.37.45.2:1000/api/v1/category/deletecategory/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete category');
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleCategoryName = async () => {
    if (!categoryName) return;
  
    if (editIndex !== null) {
      const updatedCategories = [...categories];
      updatedCategories[editIndex] = { id: editCategoryId, name: categoryName };
      await updateCategoryOnServer({ id: editCategoryId, name: categoryName });
      setCategories(updatedCategories);
    } else {
      const newCategory = await addCategory(categoryName);
      if (newCategory) {
        setCategories(prevCategories => [...prevCategories, newCategory]); 
      }
    }
  
    setCategoryName('');
    setShowCategoryModal(false);
    setEditIndex(null);
    setEditCategoryId(null);
  };
  
  const handleSubCategoryName = async () => {
    if (!subCategoryName || !selectedCategoryId) return;
  
    const newSubCategory = await addSubCategory(Number(selectedCategoryId), subCategoryName);
    console.log('New subcategory:', newSubCategory); // Log the new subcategory
  
    if (newSubCategory) {
        setCategories(prevCategories => {
            return prevCategories.map(cat => 
                cat.id === Number(selectedCategoryId) 
                    ? { ...cat, subCategories: [...cat.subCategories, newSubCategory] } 
                    : cat
            );
        });
    }
    
    setSubCategoryName('');
    setShowSubCategoryModal(false);
  };
  
  useEffect(() => {
    console.log('Categories state updated:', categories);
  }, [categories]);

const addCategory = async (categoryName) => {
    try {
      const response = await fetch(Url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: categoryName }),
      });
      if (!response.ok) throw new Error('Failed to add category');   
      const newCategory = await response.json();
      return { ...newCategory, subCategories: [] }; 
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const updateCategoryOnServer = async (category) => {
    try {
     const response = await fetch(`${updateUrl}/${category.id}`, {

        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
      });
      if (!response.ok) throw new Error('Failed to update category');
      return await response.json();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const addSubCategory = async (categoryId, subCategoryName) => {
    try {
        const response = await fetch(SubUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ categoryValueId:categoryId, name: subCategoryName }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server responded with:', errorData);
            throw new Error('Failed to add sub-category');
        }

        const newSubCategory = await response.json();
        return newSubCategory; 
    } catch (error) {
        console.error('Error adding sub-category:', error);
    }
};


  const toggleAccordion = (categoryId) => {
    setExpandedCategoryId(
      expandedCategoryId === categoryId ? null : categoryId
    );
  };
  
  return (
    <div>
    <h1 className="center display-4">Categories List</h1>
      <div className="button-container">
      <button
  type="button"
  className="btn btn-primary"
  onClick={() => {
    setShowCategoryModal(true);
    setEditIndex(null);
    setEditCategoryId(null);  
  }}
>
  Add Category
</button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowSubCategoryModal(true)}
        >
          Add Sub-Category
        </button>
        <button type="button" className="btn btn-success">
          Export to Excel
        </button>
      </div>

      {showCategoryModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h3>{editIndex !== null ? "Edit Category" : "Add New Category"}</h3>
                <button type="button" className="btn-close" onClick={() => setShowCategoryModal(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder='Category Name'
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowCategoryModal(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleCategoryName}>
                  {editIndex !== null ? "Update Category" : "Add Category"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSubCategoryModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Add New Sub-Category</h3>
                <button type="button" className="btn-close" onClick={() => setShowSubCategoryModal(false)}></button>
              </div>
              <div className="modal-body">
              <select 
  className="form-control" 
  onChange={(e) => setSelectedCategoryId(e.target.value)} 
  value={selectedCategoryId || ''}
>

                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <input
                  type="text"
                  className="form-control"
                  placeholder='Sub-Category Name'
                  value={subCategoryName}
                  onChange={(e) => setSubCategoryName(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowSubCategoryModal(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSubCategoryName}>Add Sub-Category</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <br></br>

      <div className="accordion" id="accordionExample">
  {categories.map((cat, index) => (
    <div key={cat.id} className="accordion-item">
      <h2 
        className="accordion-header" 
        id={`heading${index}`} 
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <button
          className={`accordion-button ${expandedCategoryId === cat.id ? '' : 'collapsed'}`}
          type="button"
          onClick={() => toggleAccordion(cat.id)}
          aria-expanded={expandedCategoryId === cat.id}
          aria-controls={`collapse-${cat.id}`}
        >
          {cat.name}
        </button>
        <div className="button-group" style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="button" 
            className="btn btn-sm btn-warning" 
            onClick={() => handleEdit(index)}
            style={{ border: 'none', background: 'transparent' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
            </svg>
          </button>
          <button 
            type="button" 
            className="btn btn-sm btn-danger" 
            onClick={() => handleDelete(index)}
            style={{ border: 'none', background: 'transparent' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
            </svg>
          </button>
        </div>
      </h2>
      <div 
        id={`collapse-${cat.id}`} 
        className={`accordion-collapse collapse ${expandedCategoryId === cat.id ? 'show' : ''}`}
      >
        <div className="accordion-body">
          {cat.subCategories && cat.subCategories.length > 0 ? (
            <ul>
              {cat.subCategories.map((subCat) => (
                <li key={subCat.id}>{subCat.name}</li>
              ))}
            </ul>
          ) : (
            <p>No subcategories available.</p>
          )}
        </div>
      </div>
    </div>
  ))}
</div>


    </div>
  );
}

export default Categorys;


