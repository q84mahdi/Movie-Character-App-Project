import styled, { css } from "styled-components";

const variants = {
  favorites: css`
    font-size: 0.9rem;
    position: absolute;
    top: 0;
    right: -6px;
    display: inline-flex;
    background-color: var(--rose-500);
    color: #fff;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    padding: 1px 4px;
  `,

  secondary: css`
    background-color: var(--slate-600);
  `,
} as const;

type BadgeVariant = keyof typeof variants;

interface BadgeProps {
  variant: BadgeVariant;
}

const Badge = styled.span<Partial<BadgeProps>>`
  white-space: nowrap;
  padding: 0.3rem 1rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 700;

  ${({ variant = "secondary" }) => variants[variant]}
`;

export default Badge;
