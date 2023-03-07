import { Container, List, Navbar, Portal } from '@mantine/core';
import { useRouter } from 'next/router';

import { A } from '@/components/A';

import { links } from '../navbar';

type Props = {
  opened: boolean;
  onChange?: () => void;
};

export const BurgerMenu = ({ opened, onChange }: Props) => {
  const router = useRouter();

  if (!opened) {
    return null;
  }

  return (
    <Portal>
      <Container
        fluid={true}
        className='fixed top-0 left-0 mt-16 h-screen w-screen bg-white'
      >
        <Navbar className='border-0'>
          <List
            listStyleType='none'
            className='flex flex-col gap-5 p-5 text-center'
          >
            {links.map(link => (
              <List.Item key={link.title} onClick={onChange}>
                <A
                  className='text-4xl'
                  active={router.asPath === link.href}
                  href={link.href}
                >
                  {link.title}
                </A>
              </List.Item>
            ))}
          </List>
        </Navbar>
      </Container>
    </Portal>
  );
};
