import { ProgressAccordion } from "@medusajs/ui";
// import * as AccordionPrimitive from "@radix-ui/react-accordion";
// import React from "react";

// const Item = ({
//   title,
//   subtitle,
//   description,
//   children,
//   className,
//   headingSize = "large",
//   customTrigger = undefined,
//   forceMountContent = undefined,
//   triggerable,
//   ...props
// } : any) => {
//   return (<>
//     <AccordionPrimitive.Item
//       {...props}
//       className={clx(
//         "border-grey-20 group border-t last:mb-0 last:border-b",
//         "py-3",
//         className
//       )}
//     >
//       <AccordionPrimitive.Header className="px-1">
//         <div className="flex flex-col">
//           <div className="flex w-full items-center justify-between">
//             <div className="flex items-center gap-4">
//               <Text className="text-ui-fg-subtle text-sm">{title}</Text>
//             </div>
//             <AccordionPrimitive.Trigger>
//               {customTrigger || <MorphingTrigger />}
//             </AccordionPrimitive.Trigger>
//           </div>
//           {subtitle && (
//             <Text as="span" size="small" className="mt-1">
//               {subtitle}
//             </Text>
//           )}
//         </div>
//       </AccordionPrimitive.Header>
//       <AccordionPrimitive.Content
//         forceMount={forceMountContent}
//         className={clx(
//           "radix-state-closed:animate-accordion-close radix-state-open:animate-accordion-open radix-state-closed:pointer-events-none px-1"
//         )}
//       >
//         <div className="inter-base-regular group-radix-state-closed:animate-accordion-close">
//           {description && <Text>{description}</Text>}
//           <div className="w-full">{children}</div>
//         </div>
//       </AccordionPrimitive.Content>
//     </AccordionPrimitive.Item>
//       </>
//   )
// }

// const MorphingTrigger = () => {
//   return (
//     <div className="text-grey-90 hover:bg-grey-5 active:bg-grey-5 active:text-violet-60 focus:border-violet-60 disabled:text-grey-30 bg-transparent disabled:bg-transparent rounded-rounded group relative p-[6px]">
//       <div className="h-5 w-5">
//         <span className="bg-grey-50 rounded-circle group-radix-state-open:rotate-90 absolute inset-y-[31.75%] left-[48%] right-1/2 w-[1.5px] duration-300" />
//         <span className="bg-grey-50 rounded-circle group-radix-state-open:rotate-90 group-radix-state-open:left-1/2 group-radix-state-open:right-1/2 absolute inset-x-[31.75%] top-[48%] bottom-1/2 h-[1.5px] duration-300" />
//       </div>
//     </div>
//   )
// }

// export default {
//   Root: AccordionPrimitive.Root,
//   Item,
//   Trigger: AccordionPrimitive.Trigger,
//   Content: AccordionPrimitive.Content,
// }

const Accordion = ({ children }) => {
  return <ProgressAccordion  type="multiple">
    {children}
  </ProgressAccordion>
}

const AccordionItem = ({ title, children }) => {
return <ProgressAccordion.Item value={title}>
  <ProgressAccordion.Header className="[&_span]:hidden py-[.8rem] px-0">
  {title}
  </ProgressAccordion.Header>
  <ProgressAccordion.Content className="p-1 [&_svg]:scale-150">
     {children}
  </ProgressAccordion.Content>
</ProgressAccordion.Item>
}

export default {Root: Accordion, Item: AccordionItem}