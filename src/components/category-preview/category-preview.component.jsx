import {CategoryPreviewContainer, TitleLink, Preview} from "./category-preview.styles";
import ProductCard from "../product-card/product-card.component";


const CategoryPreview = ({title, products}) => {
	return (
		<CategoryPreviewContainer>
			<h2>
				<TitleLink to={title}>{title.toUpperCase()}</TitleLink>
			</h2>
			<Preview>
				{products
						.filter((_, idx) => idx < 4)
						.map((product) => (
							<ProductCard key={product.id} product={product} />
					))} 
			</Preview>
		</CategoryPreviewContainer>
	)
}

export default CategoryPreview;

//?  underscore meaning that I do no want to use the first passing value
