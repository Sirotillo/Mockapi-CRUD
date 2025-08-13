import { memo, type FC } from "react";
import type { IProduct } from "../../types";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  gridCol?: string;
  data: IProduct[] | undefined;
}

const ProductView: FC<Props> = ({ title, data }) => {
  const wrapperClass = `grid grid-cols-5 gap-3 `;
  const navigate = useNavigate()
  return (
    <div className="container mx-auto">
      <h2 className="text-xl font-bold my-4 ">{title}</h2>
      <div className={wrapperClass}>
        {data?.map((product: IProduct) => (
          <div key={product.id} className="p-4 border border-gray-200">
            <div >
              <img onClick={()=> navigate(`/product/${product.id}`)} src={product.thumbnail} alt="" />
            </div>
            <div>
              <h3 className="line-clamp-1" title={product.title}>{product.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(ProductView);
