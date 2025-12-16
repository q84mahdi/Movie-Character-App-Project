import styled, { css } from "styled-components";

const variants = {
  primary: css`
    background-color: var(--slate-500);
    color: var(--slate-100);
  `,

  secondary: css`
    border: 1px solid var(--slate-100);
    color: var(--slate-100);
  `,
} as const;

type ButtonVariant = keyof typeof variants;

interface ButtonProps {
  variant: ButtonVariant;
}

const Button = styled.button<Partial<ButtonProps>>`
  padding: 0.8rem 1rem;
  border-radius: 1rem;
  font-weight: 700;

  ${({ variant = "primary" }) => variants[variant]}
`;

export default Button;
