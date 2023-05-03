import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`} variant={variant}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          { salePrice && <SalePrice>{formatPrice(salePrice)}</SalePrice> }
        </Row>
      </Wrapper>
    </Link>
  );
};

const Variants = {
  'on-sale': {
    tagText: 'Sale',
    tagColor: COLORS.primary,
    priceTextDecoration: 'line-through',
    priceColor: COLORS.gray[700],
  },
  'new-release': {
    tagText: 'Just Released!',
    tagColor: COLORS.secondary,
  },
  default: {
    tagDisplay: 'none',
  },
};

const Link = styled.a`
  --tag-display: ${({ variant }) => Variants[variant].tagDisplay };
  --tag-text: "${({ variant }) => Variants[variant].tagText }";
  --tag-color: ${({ variant }) => Variants[variant].tagColor };
  --price-color: ${({ variant }) => Variants[variant].priceColor };
  --price-text-decoration: ${({ variant }) => Variants[variant].priceTextDecoration };

  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  position: relative;

  &::after {
    display: var(--tag-display);
    content: var(--tag-text);
    position: absolute;
    top: 12px;
    right: -4px;
    background: var(--tag-color);
    color: ${COLORS.white};
    padding: 9px;
    border-radius: 2px;
    font-weight: 700;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: var(--price-color);
  text-decoration-line: var(--price-text-decoration);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
