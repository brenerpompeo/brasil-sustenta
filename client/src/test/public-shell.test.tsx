import React, { forwardRef } from "react";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { NewsletterForm } from "@/components/LeadCaptureComponents";
import Home from "@/pages/Home";
import { NAV_FOOTER_GROUPS } from "@/constants/navigation-data";

const {
  mockUseLocation,
  mockPartnerUseQuery,
  mockMapUseQuery,
} = vi.hoisted(() => ({
  mockUseLocation: vi.fn(() => ["/", vi.fn()]),
  mockPartnerUseQuery: vi.fn(() => ({
    data: ["PUC Campinas", "Unicamp"],
    isLoading: false,
  })),
  mockMapUseQuery: vi.fn(() => ({
    data: undefined,
    isLoading: false,
  })),
}));

vi.mock("wouter", () => ({
  Link: forwardRef<
    HTMLAnchorElement,
    React.ComponentPropsWithoutRef<"a"> & { href: string }
  >(({ href, children, ...props }, ref) => (
    <a ref={ref} href={href} {...props}>
      {children}
    </a>
  )),
  useLocation: mockUseLocation,
}));

vi.mock("framer-motion", async () => {
  const ReactModule = await import("react");

  const createMotionComponent = (tag: string) => {
    return ({ children, ...props }: Record<string, unknown>) => {
      const {
        initial,
        animate,
        exit,
        whileInView,
        viewport,
        transition,
        ...domProps
      } = props;

      void initial;
      void animate;
      void exit;
      void whileInView;
      void viewport;
      void transition;

      return ReactModule.createElement(tag, domProps, children);
    };
  };

  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: new Proxy(
      {},
      {
        get: (_target, property) => createMotionComponent(String(property)),
      }
    ),
  };
});

vi.mock("@/components/SEO", () => ({
  SEO: () => null,
}));

vi.mock("@/components/TerritoryMap", () => ({
  default: () => <div data-testid="territory-map">Territory Map</div>,
}));

vi.mock("@/lib/trpc", () => ({
  trpc: {
    territory: {
      public: {
        listMapNodes: {
          useQuery: mockMapUseQuery,
        },
      },
    },
    university: {
      public: {
        listPartners: {
          useQuery: mockPartnerUseQuery,
        },
      },
    },
  },
}));

describe("public shell", () => {
  it("renders semantic lead capture states", async () => {
    vi.useFakeTimers();

    render(
      <NewsletterForm
        variant="light"
        label="E-mail institucional"
        inputName="institutional_email"
        successMessage="Mensagem de sucesso consistente."
        source="test:newsletter"
      />
    );

    const input = screen.getByLabelText("E-mail institucional");
    expect(input).toHaveAttribute("name", "institutional_email");
    expect(input).toHaveAttribute("autocomplete", "email");
    expect(input).toHaveAttribute("spellcheck", "false");

    fireEvent.change(input, { target: { value: "time@brasilsustenta.org" } });
    fireEvent.submit(input.closest("form")!);

    await act(async () => {
      vi.advanceTimersByTime(1200);
    });

    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("data-source", "test:newsletter");
    expect(status).toHaveTextContent("Mensagem de sucesso consistente.");

    vi.useRealTimers();
  });

  it("opens the public shell drawer with grouped navigation", () => {
    mockUseLocation.mockReturnValue(["/para-empresas", vi.fn()]);

    render(<Header />);

    fireEvent.click(
      screen.getByRole("button", { name: /abrir navegação principal/i })
    );

    expect(
      screen.getByRole("dialog", {
        name: /navegação principal do brasil sustenta/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Acessos Restritos")).toBeInTheDocument();
    expect(screen.getByText("Documentos & Governança")).toBeInTheDocument();
    expect(screen.getAllByText("Para Prefeituras").length).toBeGreaterThan(0);
  });

  it("renders footer groups from the shared IA contract", () => {
    render(<Footer />);

    NAV_FOOTER_GROUPS.forEach((group) => {
      const groupHeading = screen.getByText(group.title);
      const groupContainer = groupHeading.closest("div");

      expect(groupHeading).toBeInTheDocument();
      expect(groupContainer).not.toBeNull();
      expect(
        within(groupContainer as HTMLElement).getByRole("link", {
          name: group.items[0].label,
        })
      ).toBeInTheDocument();
    });
  });

  it("renders home trust signals and the hardened hero media", () => {
    mockUseLocation.mockReturnValue(["/", vi.fn()]);

    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /seu desafio esg vira squad, sprint e relatório/i,
      })
    ).toBeInTheDocument();

    const trustStrip = screen.getByRole("list", {
      name: /sinais institucionais de confiança/i,
    });
    expect(
      within(trustStrip).getByText("Universidades parceiras ativas")
    ).toBeInTheDocument();
    expect(within(trustStrip).getByText("02")).toBeInTheDocument();

    const image = screen.getByAltText(/vista aérea de campinas - infraestrutura/i);
    expect(image).toHaveAttribute("width", "2070");
    expect(image).toHaveAttribute("height", "1380");
    expect(image).toHaveAttribute("loading", "eager");
    expect(image).toHaveAttribute("fetchpriority", "high");

    expect(
      screen.getByLabelText(/e-mail para early access institucional/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId("territory-map")).toBeInTheDocument();
  });
});
