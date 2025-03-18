export default function Footer() {
  return (
    <footer className="h-12 flex justify-center border-t border-dashed items-center ">
      <section className="container h-full flex flex-wrap gap-2 items-center px-4 border-x border-dashed">
        <p className="text-sm text-muted-foreground">Developed by Uyzen317</p>
        <p className="text-xs text-muted-foreground">
          All Rights Protected under Apachi Licence &copy; 2025
          <span className="text-muted">
            &nbsp;Apachi Open Foundation 2025 &copy;{" "}
          </span>
        </p>

        <div className="grow"></div>
        <p className="text-xs text-muted">
          Powered BY{" "}
          <span className="text-muted-foreground">
            NextJS, Zustand, NestJS, Prisma
          </span>{" "}
          - Deployment SAAS BY{" "}
          <span className="text-muted-foreground">Liara </span>
          Iran / Qom - All Rights Reserved &copy; 2025
        </p>
      </section>
    </footer>
  );
}
