import BrandLogo from "@/components/ui/BrandLogo";

const footerColumns = [
  {
    title: "探索",
    items: [
      ["产品体验", "#product"],
      ["使用场景", "#scenes"],
      ["听觉原理", "#spatial-audio"],
    ],
  },
  {
    title: "了解",
    items: [
      ["产品亮点", "#features"],
      ["购买指南", "#specs"],
      ["参与预售", "#cta"],
    ],
  },
  {
    title: "官方渠道",
    items: [
      ["官方网站", "https://bubbleflow.cn"],
      ["微信小程序", "#specs"],
      ["淘宝授权店", "#specs"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#030305]">
      <div className="section-container py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <BrandLogo size={34} className="h-[34px] w-[34px]" />
              <span className="text-[15px] font-medium text-white/85">BubbleFlow</span>
            </div>
            <p className="text-[13px] font-normal leading-[1.7] text-white/42">
              让声音离开平面，
              <br />
              在你的房间里真实发生。
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="mb-4 text-[13px] font-medium text-white/65">{column.title}</h2>
              <ul className="space-y-2.5">
                {column.items.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-[13px] font-normal text-white/35 transition-colors duration-200 hover:text-white/70"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/[0.06] pt-6 text-[11px] text-white/25 md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 BubbleFlow. All rights reserved.</p>
          <p>汽泡音露 · 多维智能音频音乐交互平台</p>
        </div>
      </div>
    </footer>
  );
}
