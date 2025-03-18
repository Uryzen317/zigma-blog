import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

export default function Breakcrumb() {
  return (
    <div className="flex justify-center">
      <div className="container px-4 py-6 border-x border-dashed flex justify-end">
        <Breadcrumb dir="rtl">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">خانه</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">دسته بندی اول</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>زیرشاخه اول</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
