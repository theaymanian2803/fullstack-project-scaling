import ProductGrid from './ProductGrid'

function Grid({ products }) {
  return (
    <div className=" md:mt-8 p-7 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductGrid key={product._id} product={product} />
      ))}
    </div>
  )
}

export default Grid
