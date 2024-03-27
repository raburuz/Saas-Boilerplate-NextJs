/* LIBRARIES */
import { cn } from '@/lib/utils';
import { useMDXComponent } from 'next-contentlayer/hooks';

/* MDX COMPONENTS */
export const components = {
  h1: (props: any) => (
    <h1 className="text-4xl text-foreground" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-2xl text-foreground" {...props} />
  ),
  h3: (props: any) => (
    <h2 className="text-xl text-foreground" {...props} />
  ),
  p: (props: any) => (
    <p className="text-foreground" {...props} />
  ),
  strong: (props: any) => (
    <strong className="text-primary font-medium" {...props} />
  ),
  a: (props: any) => (
    <a className="text-primary hover:opacity-80" target='_blank' rel='nofollow noreferrer noopener' {...props} />
  ),
  li: (props: any) => (
    <li className="text-foreground" {...props} />
  ),
  ol: (props: any) => (
    <ol className="text-foreground" {...props} />
  ),
  code: (props: any) => (
    <code
      className="w-full rounded-md px-2 py-1 font-light before:hidden after:hidden text-xs text-foreground"
      {...props}
    />
  )
}

/* COMPONENT */
interface IProps {
  code: string,
  className?: string,
}

export const MDX = ( { code, className }: IProps ) => {
  const Component = useMDXComponent(code);

  return (
    <div
      data-mdx-container
      className={cn(
        "prose max-w-none transition-all prose-headings:relative prose-headings:scroll-mt-20 prose-headings:font-display prose-headings:font-bold ",
        className,
      )}
    >
      <Component
        components={{
          ...components,
        }}
      />
    </div>
  );
}
