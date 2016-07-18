<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:xsd="http://www.w3.org/1999/XMLSchema">

    <xsl:output method="text" encoding="UTF-8"/>

    <xsl:template match="/">
      <xsl:text>ID, Created, Name, Release, Begin, End, Type, Value, ItemPlatform, ItemPublisher, ItemName, ItemDataType, InstanceBegin, InstanceEnd, Category, MetricType, Count</xsl:text>
      <xsl:text>&#xA;</xsl:text>
      <xsl:for-each select="ReportResponse/Report/Report/Customer/ReportItems">
          <xsl:variable name="first" select="."/>
          <xsl:for-each select="$first/ItemPerformance">
              <xsl:variable name="second" select="."/>
              <xsl:for-each select="$second/Instance">
                  <xsl:variable name="third" select="."/>
                  <xsl:text>"</xsl:text>
                  <xsl:value-of select="/ReportResponse/ID"/>
                  <xsl:text>","</xsl:text>
                  <xsl:value-of select="/ReportResponse/Created"/>
                  <xsl:text>","</xsl:text>
                  <xsl:value-of select="/ReportResponse/ReportDefinition/Name"/>
                  <xsl:text>","</xsl:text>
                  <xsl:value-of select="/ReportResponse/ReportDefinition/Release"/>
                  <xsl:text>","</xsl:text>
                  <xsl:value-of select="/ReportResponse/ReportDefinition/Filters/UsageDateRange/Begin"/>
                  <xsl:text>","</xsl:text>
                  <xsl:value-of select="/ReportResponse/ReportDefinition/Filters/UsageDateRange/End"/>
                  <xsl:text>","</xsl:text>
                  <xsl:value-of select="$first/ItemIdentifier/Type"/>
                  <xsl:text>","</xsl:text>
                  <xsl:value-of select="$first/ItemIdentifier/Value"/>
                  <xsl:text>","</xsl:text>
                  <xsl:value-of select="$first/ItemPlatform"/>
                  <xsl:text>","</xsl:text>
                  <xsl:value-of select="$first/ItemPublisher"/>
                  <xsl:text>","</xsl:text>
                  <xsl:value-of select="$first/ItemName"/>
                  <xsl:text>","</xsl:text>
                  <xsl:value-of select="$first/ItemDataType"/>
                  <xsl:text>","</xsl:text>
                  <xsl:value-of select="$second/Period/Begin"/>
                  <xsl:text>","</xsl:text>
                  <xsl:value-of select="$second/Period/End"/>
                  <xsl:text>","</xsl:text>
                  <xsl:value-of select="$second/Category"/>
                  <xsl:text>","</xsl:text>
                  <xsl:value-of select="$third/MetricType"/>
                  <xsl:text>","</xsl:text>
                  <xsl:value-of select="$third/Count"/>
                  <xsl:text>"</xsl:text>
                  <xsl:text>&#xA;</xsl:text>
              </xsl:for-each>
          </xsl:for-each>
      </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>
