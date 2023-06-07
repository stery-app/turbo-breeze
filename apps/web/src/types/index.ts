import React from "react";
import { UrlObject } from "url";

export type UserType = {
  name?: string;
  email?: string;
  email_verified_at?: string;
};

export declare type Url = string | UrlObject;

export type FaviconProps = {
  basePath?: string;
  themeColor?: string;
};

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type LabelProps = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;

export type NavLinkProps = {
  active?: boolean;
  href: Url;
  children?: string | number | JSX.Element | JSX.Element[];
};

export type NavButtonProps = ButtonProps & {
  active?: boolean;
};

export type DropdownLinkProps = {
  href: Url;
  children?: string | number | JSX.Element | JSX.Element[];
};

export type DropdownButtonProps = ButtonProps;

export type GuestLayoutProps = {
  children?: string | number | JSX.Element | JSX.Element[];
};

export type AppLayoutProps = {
  header?: string | number | JSX.Element | JSX.Element[];
  children?: string | number | JSX.Element | JSX.Element[];
};

export type NavigationProps = {
  user?: UserType | undefined;
};

export type AuthCardProps = {
  logo: JSX.Element;
  children?: string | number | JSX.Element | JSX.Element[];
};

export type AuthSessionStatusProps = {
  status: string | JSX.Element | null;
  className?: string;
  children?: string | number | JSX.Element | JSX.Element[];
};
