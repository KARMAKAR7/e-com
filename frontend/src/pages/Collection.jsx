import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
function Collection() {
    const { products, search, showSearch
    } = useContext(ShopContext);
    const [showFilter, setShowFilte] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setcategory] = useState([]);
    const [subCategory, setsubCategory] = useState([]);
    const [sortType, setSortType] = useState('relavent');

    const toggelcategory = (e) => {
        if (category.includes(e.target.value)) {
            setcategory(pre => pre.filter(item => item !== e.target.value))
        } else {
            setcategory(pre => [...pre, e.target.value])
        }
    }

    const toggelsubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setsubCategory(pre => pre.filter(item => item !== e.target.value))
        } else {
            setsubCategory(pre => [...pre, e.target.value])
        }
    }

    const applyFilter = () => {
        let productsCopy = products.slice();
        if (showSearch && search) {
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        }
        // setFilteredProducts(productsCopy);
        if (category.length > 0) {
            // console.log(category.length);

            productsCopy = productsCopy.filter(item => category.includes(item.category))
        }
        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
        }
        setFilteredProducts(productsCopy)
    }

    const sortProducts = () => {
        let fpCopy = filteredProducts.slice();
        switch (sortType) {
            case 'low-high':
                setFilteredProducts(fpCopy.sort((a, b) => a.price - b.price));
                break;
            case 'high-low':
                setFilteredProducts(fpCopy.sort((a, b) => b.price - a.price));
                break;
            case 'relavent':
                // Assuming relevance is based on some criteria, you can implement it here      
                setFilteredProducts(fpCopy.sort((a, b) => a.name.localeCompare(b.name))); // Example: sorting by name
                break;
            default:
                // Default sorting can be based on relevance or any other criteria
                applyFilter();
                break;
        }
    }
    useEffect(() => {
        applyFilter();
        // console.log('category:', category, 'subCategory:', subCategory);

    }, [category, subCategory, search, showSearch, products]);
    useEffect(() => {
        sortProducts(sortType);
    }, [sortType]);

    useEffect(() => {
        setFilteredProducts(products);
    }, []);

    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
            {/* filter options */}
            <div className='min-w-60'>
                <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
                    <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
                </p>
                {/*category filter*/}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Men'} onChange={toggelcategory} />Men
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Women'} onChange={toggelcategory} />Women
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Kids'} onChange={toggelcategory} />Kids
                        </p>
                    </div>
                </div>
                {/*SubCatorgy Filter*/}
                <div className={`border border-gray-300 pl-5 py-3 my-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>TYPE</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggelsubCategory} />Topwear
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggelsubCategory} />Bottomwear
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggelsubCategory} />Winterwear
                        </p>
                    </div>
                </div>
            </div>
            {/*Right side UI*/}
            <div className='flex-1'>
                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <Title text1={'ALL'} text2={'COLLECTIONS'} />
                    {/*Product Sort*/}
                    <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2 '>
                        <option value="relavent">Sort by: Relavent</option>
                        <option value="low-high">Sort by: Low-High</option>
                        <option value="high-low">Sort by: High-Low</option>
                    </select>
                </div>
                {/* map products */}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                    {
                        filteredProducts.map((item, index) => (
                            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default Collection
